package com.Authentication_Service.Authentication_Service.Services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Authentication_Service.Authentication_Service.Dto.BooksRequestDto;
import com.Authentication_Service.Authentication_Service.Dto.Borrowed_Books_Dto;
import com.Authentication_Service.Authentication_Service.DtoReturn.BooksRequestDtoReturn;
import com.Authentication_Service.Authentication_Service.DtoReturn.UserRegisterRequestDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.Book;
import com.Authentication_Service.Authentication_Service.Model.Books_Request;
import com.Authentication_Service.Authentication_Service.Model.Borrowed_Books;
import com.Authentication_Service.Authentication_Service.Model.User;
import com.Authentication_Service.Authentication_Service.Model.UserProfile;
import com.Authentication_Service.Authentication_Service.Model.UserRegisterRequest;
import com.Authentication_Service.Authentication_Service.Repository.BookRepository;
import com.Authentication_Service.Authentication_Service.Repository.BooksRequestRepository;
import com.Authentication_Service.Authentication_Service.Repository.BorrowedBooksRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserProfileRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserRegisterRequestRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserRepository;

@Service
public class RequestService {

    private final BooksRequestRepository booksRequestRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowedBooksRepository borrowedBooksRepository;
    private final UserRegisterRequestRepository userRegisterRequestRepository;
    private final UserProfileRepository userProfileRepository;
    @Autowired
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public RequestService(BooksRequestRepository booksRequestRepository, BookRepository bookRepository,
            UserRepository userRepository, BorrowedBooksRepository borrowedBooksRepository,
            UserRegisterRequestRepository userRegisterRequestRepository, UserProfileRepository userProfileRepository) {
        this.booksRequestRepository = booksRequestRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.borrowedBooksRepository = borrowedBooksRepository;
        this.userRegisterRequestRepository = userRegisterRequestRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public List<BooksRequestDtoReturn> getAllBorrowingRequests() {
        List<BooksRequestDtoReturn> list = new ArrayList<>();
        List<Books_Request> requests = booksRequestRepository.findAll();
        for (Books_Request request : requests) {
            BooksRequestDtoReturn dto = new BooksRequestDtoReturn();
            Optional<User> user = userRepository.findById(request.getUserid());
            Optional<Book> book = bookRepository.findBookByISBN(request.getBookisbn());

            dto.setUsername(user.get().getUsername());
            dto.setBooktitle(book.get().getBooktitle());
            list.add(dto);
        }
        return list;
    }

    public String sendBookBorrowRequest(int ISBN, int userId) {
        Book book = bookRepository.findBookByISBN(ISBN).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (book == null || user == null) {
            return "book or user not found";
        }

        boolean isBorrowed = borrowedBooksRepository.existsByBookisbnAndUseridAndReturndateIsNull(book.getISBN(),
                user.getUserid());
        if (isBorrowed) {
            return "this book is already borrowed";
        }

        Books_Request isRequested = booksRequestRepository.findByBookisbnAndUserid(ISBN, userId);
        if (isRequested != null) {
            return "this book has already been requested";
        }
        if (user.getNumofborrowedbooks() == 10) {
            return "you reached the max number of borrowed books!";
        }

        BooksRequestDto request = new BooksRequestDto();
        request.setBookisbn(book.getISBN());
        request.setUserid(user.getUserid());
        Books_Request requestt = modelMapper.map(request, Books_Request.class);
        booksRequestRepository.save(requestt);
        return "the request have been sent Successfully";
    }

    public boolean acceptBorrowRequest(BooksRequestDtoReturn request) {
        // Fetch the request by its ID
        User user = userRepository.findUserByUsername(request.getUsername());
        Book book = bookRepository.findBookByBooktitle(request.getBooktitle());
        Books_Request Request = booksRequestRepository.findByBookisbnAndUserid(book.getISBN(), user.getUserid());
        if (Request == null) {
            return false; // Request not found
        }

        // Create a new borrowed book entry
        Borrowed_Books_Dto borrowedBook = new Borrowed_Books_Dto();
        borrowedBook.setUserid(user.getUserid());
        borrowedBook.setBookisbn(book.getISBN());
        borrowedBook.setBorrowdate(LocalDate.now());
        borrowedBook.setDuedate(LocalDate.now().plusDays(14)); // Assuming 14 days for return
        // Save the borrowed book entry
        booksRequestRepository.delete(Request);
        user.setNumofborrowedbooks(user.getNumofborrowedbooks() + 1);
        userRepository.save(user);
        Borrowed_Books b = modelMapper.map(borrowedBook, Borrowed_Books.class);
        borrowedBooksRepository.save(b);
        return true; // Request approved successfully
    }

    public boolean rejectBorrowRequest(BooksRequestDtoReturn request) {
        User user = userRepository.findUserByUsername(request.getUsername());
        Book book = bookRepository.findBookByBooktitle(request.getBooktitle());
        Books_Request Request = booksRequestRepository.findByBookisbnAndUserid(book.getISBN(), user.getUserid());
        if (Request == null) {
            return false;
        }
        booksRequestRepository.delete(Request);

        return true;
    }

    public List<UserRegisterRequestDtoReturn> GetAllRegisterRequests() {
        List<UserRegisterRequestDtoReturn> list = new ArrayList<>();
        List<UserRegisterRequest> requests = userRegisterRequestRepository.findAll();
        if (requests.isEmpty()) {
            return list;
        }
        for (UserRegisterRequest request : requests) {
            UserRegisterRequestDtoReturn dto = modelMapper.map(request, UserRegisterRequestDtoReturn.class);
            list.add(dto);
        }
        return list;
    }

    public boolean acceptUserRegisterRequest(String username) {
        UserRegisterRequest request = userRegisterRequestRepository.findByUsername(username);
        if (request==null) {
            return false; // Request not found
        }

        // Create a new borrowed book entry
        User user = new User();
        user.setRole("user");
        user.setPassword(request.getPassword());
        user.setUsername(request.getUsername());
        user.setNumofborrowedbooks(0);
        userRepository.save(user);
        UserProfile profile = new UserProfile();
        profile.setEmail(request.getEmail());
        profile.setFname(request.getFname());
        profile.setLname(request.getLname());
        profile.setUserid(user.getUserid());
        profile.setProfileimage(request.getProfileimage());
        userProfileRepository.save(profile);
        userRegisterRequestRepository.delete(request);

        return true; // Request approved successfully
    }

    public boolean rejectUserRegisterRequest(String username) {
        UserRegisterRequest request = userRegisterRequestRepository.findByUsername(username);
        if (request==null) {
            return false; // Request not found
        }
        userRegisterRequestRepository.delete(request);
        return true;
    }

}
