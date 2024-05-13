package com.Authentication_Service.Authentication_Service.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Authentication_Service.Authentication_Service.Model.Borrowed_Books;
import com.Authentication_Service.Authentication_Service.Repository.BorrowedBooksRepository;

@Service
public class Borrowed_BooksService {

    @Autowired
    private final BorrowedBooksRepository borrowedbooksRepository;

    public Borrowed_BooksService(BorrowedBooksRepository borrowed_booksRepository) {
        this.borrowedbooksRepository = borrowed_booksRepository;
    }

    public List<Borrowed_Books> getAllBorrowedBooks() {
        return borrowedbooksRepository.findAll();
    }


    }
