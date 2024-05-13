package com.Authentication_Service.Authentication_Service.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Authentication_Service.Authentication_Service.Model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    // You can add custom query methods if needed
    Book getBookBybooktitle(String booktitle);
     Optional<Book> findBookByISBN(int isbn);
    List<Book> getBooksByRacknumber(Integer R_N);
    Book findBookByBooktitle(String booktitle);
    List<Book> findByBooktitleStartingWith(String booktitle);

}
