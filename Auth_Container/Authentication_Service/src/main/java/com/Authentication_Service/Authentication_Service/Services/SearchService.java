package com.Authentication_Service.Authentication_Service.Services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Authentication_Service.Authentication_Service.DtoReturn.BookDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.Book;
import com.Authentication_Service.Authentication_Service.Model.Borrowed_Books;
import com.Authentication_Service.Authentication_Service.Model.User;
import com.Authentication_Service.Authentication_Service.Repository.BookRepository;
import com.Authentication_Service.Authentication_Service.Repository.BorrowedBooksRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserRepository;

@Service
public class SearchService {
    private final BookRepository bookRepository;
    private final BorrowedBooksRepository borrowedBooksRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SearchService(BookRepository bookRepository, UserRepository userRepository,
            BorrowedBooksRepository borrowedBooksRepository) {
        this.bookRepository = bookRepository;
        this.borrowedBooksRepository = borrowedBooksRepository;
        this.userRepository = userRepository;
        this.modelMapper = new ModelMapper();
    }


    public List<BookDtoReturn> searchByTitle(String booktitle,Integer userid) {
        List<BookDtoReturn> returnedBooks = new ArrayList<>();
        List<Book> books = bookRepository.findByBooktitleStartingWith(booktitle);
        if (!books.isEmpty()) {
            books.forEach(book -> {
                BookDtoReturn bookReturn = modelMapper.map(book, BookDtoReturn.class);
                Borrowed_Books isBorrowed =borrowedBooksRepository.findByBookisbn(book.getISBN());
                User user = userRepository.findByUserid(userid);
                if(borrowedBooksRepository.findByUserid(user.getUserid())!=null){
                if (isBorrowed.getReturndate() == null) {
                    bookReturn.setIsborrowed(true);
                }
            }
            returnedBooks.add(bookReturn);
            });
        }
        return returnedBooks;
    }


}
