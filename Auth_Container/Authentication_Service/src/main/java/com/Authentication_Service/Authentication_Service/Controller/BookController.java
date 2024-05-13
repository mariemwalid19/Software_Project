package com.Authentication_Service.Authentication_Service.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Authentication_Service.Authentication_Service.Dto.BookDto;
import com.Authentication_Service.Authentication_Service.DtoReturn.BookDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.Book;
import com.Authentication_Service.Authentication_Service.Model.Books_Request;
import com.Authentication_Service.Authentication_Service.Model.Borrowed_Books;
import com.Authentication_Service.Authentication_Service.Model.User;
import com.Authentication_Service.Authentication_Service.Repository.BookRepository;
import com.Authentication_Service.Authentication_Service.Repository.BooksRequestRepository;
import com.Authentication_Service.Authentication_Service.Repository.BorrowedBooksRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserRepository;
import com.Authentication_Service.Authentication_Service.Services.BookService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/books")

public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;
    @Autowired
    private BooksRequestRepository booksRequestRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    // Create a book

    @PostMapping("/AddBook")
    public ResponseEntity<?> createBook(@Valid BookDto book, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        Book isbookfound = bookRepository.getBookBybooktitle(book.getBooktitle());
        if (isbookfound != null) {
            return ResponseEntity.badRequest().body("This Book already exists!");
        }
        Book createdBook = modelMapper.map(book, Book.class);
        try {
            byte[] bookImage = bookService.convertMultipartFileToByteArray(book.getBookimage());
            createdBook.setBookimage(bookImage);

        } catch (Exception e) {
            e.printStackTrace();
        }
        createdBook.setAvailabilitystatus(true);
        bookService.createBook(createdBook);

        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    // Get a book by ISBN
    @GetMapping("/GetBookByISBN/{ISBN}")
    public ResponseEntity<?> getBookByISBN(@PathVariable("ISBN") int ISBN) {
        Optional<Book> optionalBook = bookService.getBookById(ISBN);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            return new ResponseEntity<>(book, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getBookWithBookTitle/{userid}/{booktitle}")
    public ResponseEntity<?> getBookWithBooktitle(@PathVariable("booktitle") String booktitle,
            @PathVariable("userid") int userid) {
        Book book = bookService.getBookBybooktitle(booktitle);
        if (book != null) {
            Integer bookisbn = book.getISBN();
            Borrowed_Books isBorrowedByISBN = borrowedBooksRepository.findByBookisbn(bookisbn);
            Borrowed_Books isBorrowedByUserid = borrowedBooksRepository.findByUserid(userid);
            BookDtoReturn bookk = modelMapper.map(book, BookDtoReturn.class);
            if (isBorrowedByISBN != null && isBorrowedByUserid != null) {
                bookk.setIsborrowed(true);
            }
            return new ResponseEntity<>(bookk, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        }
    }

    // Update a book by ISBN
    @PutMapping("/UpdateBook/{ISBN}")
    public ResponseEntity<?> updateBookByISBN(@PathVariable("ISBN") int ISBN, @Valid BookDto updatedBook,
            BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        Optional<Book> optionalBook = bookService.getBookById(ISBN);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setAuthor(updatedBook.getAuthor());
            book.setBooktitle(updatedBook.getBooktitle());
            book.setDescription(updatedBook.getDescription());
            book.setRacknumber(updatedBook.getRacknumber());
            try {
                if (updatedBook.getBookimage() != null) {
                    byte[] bookImage = bookService.convertMultipartFileToByteArray(updatedBook.getBookimage());
                    book.setBookimage(bookImage);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            bookService.updateBook(ISBN, book);
            return new ResponseEntity<>(book, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("there is no book with this isbn", HttpStatus.NOT_FOUND);
        }
    }

    // Delete a book by ISBN
    @DeleteMapping("/DeleteBook/{ISBN}")
    public ResponseEntity<?> deleteBook(@PathVariable("ISBN") int ISBN) {
        Optional<Book> isExist = bookRepository.findById(ISBN);
        if (isExist.isPresent()) {
            bookService.deleteBook(ISBN);
            List<Books_Request> books = booksRequestRepository.getAllBookRequestsByBookisbn(ISBN);
            if (!books.isEmpty())
                for (Books_Request book : books) {
                    booksRequestRepository.delete(book);
                }
                List<Borrowed_Books> b_books = borrowedBooksRepository.getAllBorrowedBooksByBookisbn(ISBN);
                if (!books.isEmpty())
                    for (Borrowed_Books book : b_books) {
                        borrowedBooksRepository.delete(book);
                    }
            return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("there is no book with this isbn", HttpStatus.NOT_FOUND);
        }
    }

    // Get all available books
    @GetMapping("/GetAllAvailableBooks/{userid}")
    public ResponseEntity<?> getAllBooks(@PathVariable("userid") int userid) {
        List<BookDtoReturn> returnedBooks = new ArrayList<>();
        List<Book> books = bookService.getAllBooks();
        if (!books.isEmpty()) {
            books.forEach(book -> {
                Integer bookisbn = book.getISBN();
                boolean isborrowed = borrowedBooksRepository.existsByBookisbnAndUseridAndReturndateIsNull(bookisbn,
                        userid);

                BookDtoReturn bookk = modelMapper.map(book, BookDtoReturn.class);
                if (isborrowed) {
                    bookk.setIsborrowed(true);
                }
                returnedBooks.add(bookk);
            });
            return new ResponseEntity<>(returnedBooks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("there is no available books", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/GetAllBorrowedBooks")
    public ResponseEntity<?> getAllBorrowedBooks() {
        List<BookDtoReturn> returnedBooks = new ArrayList<>();
        List<Borrowed_Books> books = borrowedBooksRepository.findAll();
        if (!books.isEmpty()) {
            books.forEach(book -> {
                if (book.getReturndate() == null) {
                    Integer bookisbn = book.getBookisbn();
                    Integer userid = book.getUserid();
                    Optional<User> user = userRepository.findById(userid);
                    Optional<Book> retrivedBook = bookService.getBookById(bookisbn);
                  
                    if (retrivedBook.isPresent()) {
                        BookDtoReturn bookReturn = modelMapper.map(retrivedBook.get(), BookDtoReturn.class);
                        bookReturn.setUsername(user.get().getUsername());
                        returnedBooks.add(bookReturn);
                    }
                }
            });
            return new ResponseEntity<>(returnedBooks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("there is no available books", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/GetBorrowedBooks/{userid}")
    public ResponseEntity<?> GetBorrowedBooks(@PathVariable("userid") int userid) {
        List<BookDtoReturn> returnedBooks = new ArrayList<>();
        List<Borrowed_Books> books = borrowedBooksRepository.findAllBorrowedBooksByUserid(userid);
        if (!books.isEmpty()) {
            books.forEach(book -> {
                if (book.getReturndate() == null) {
                    Integer bookisbn = book.getBookisbn();
                    Optional<Book> retrivedBook = bookService.getBookById(bookisbn);
                    if (retrivedBook.isPresent()) {
                        BookDtoReturn bookReturn = modelMapper.map(retrivedBook.get(), BookDtoReturn.class);
                        returnedBooks.add(bookReturn);
                    }

                }
            });
            return new ResponseEntity<>(returnedBooks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("there is no borrowed books", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/GetRackBooks/{R_N}")
    public ResponseEntity<?> GetRackBooks(@PathVariable("R_N") int R_N) {
        List<Book> books = bookService.getRackBooks(R_N);
        if (!books.isEmpty()) {
            return new ResponseEntity<>(books, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("there is no books with this racknumber", HttpStatus.NOT_FOUND);
        }
    }

    // Handle validation errors

    private ResponseEntity<?> handleValidationErrors(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Handle MethodArgumentNotValidException for request body validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        return handleValidationErrors(result);
    }

}
