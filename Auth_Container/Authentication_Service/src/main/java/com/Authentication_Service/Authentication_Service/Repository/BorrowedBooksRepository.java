package com.Authentication_Service.Authentication_Service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Authentication_Service.Authentication_Service.Model.Borrowed_Books;

public interface BorrowedBooksRepository extends JpaRepository<Borrowed_Books, Integer> {
    Borrowed_Books findByBookisbn(Integer isbn);
    Borrowed_Books findByUserid(Integer userid);
    List<Borrowed_Books> findAllBorrowedBooksByUserid(Integer userid);
    boolean existsByBookisbnAndUseridAndReturndateIsNull(int isbn, int userid);
    List<Borrowed_Books> getAllBorrowedBooksByBookisbn(int isbn);

}