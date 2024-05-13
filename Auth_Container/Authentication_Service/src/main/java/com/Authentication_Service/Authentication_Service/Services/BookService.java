package com.Authentication_Service.Authentication_Service.Services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Authentication_Service.Authentication_Service.DtoReturn.BookDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.Book;
import com.Authentication_Service.Authentication_Service.Repository.BookRepository;

@Service
public class BookService {
        private List<String> AllowedExtensions = Arrays.asList(".jpg", ".png");

    @Autowired
    private BookRepository bookRepository;

    private final ModelMapper modelMapper;

    public BookService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public BookDtoReturn getBookDtoReturn(Book book) {
        return modelMapper.map(book, BookDtoReturn.class);
    }

    public List<Book> getRackBooks(int R_N){
         return  bookRepository.getBooksByRacknumber(R_N);
    }
    // Implement service methods here
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> getBookById(int id) {
        return bookRepository.findById(id);
    }
    
    public Book getBookBybooktitle(String booktitle) {
        return bookRepository.getBookBybooktitle(booktitle);
    }

    public Book updateBook(int id, Book updatedBook) {
        Optional<Book> existingBook = bookRepository.findById(id);
        if (existingBook != null) {
            updatedBook.setISBN(id);
            return bookRepository.save(updatedBook);
        }
        return null;
    }

    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public String getFileExtension(String filename) {
        int lastIndex = filename.lastIndexOf(".");
        if (lastIndex == -1) {
            return "";
        }
        return filename.substring(lastIndex).toLowerCase();
    }

    public boolean isAllowedExtension(String extension) {
        // Define your allowed extensions logic here
        return AllowedExtensions.contains(extension);
    }

    public byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            return outputStream.toByteArray();
        }
    }

}
