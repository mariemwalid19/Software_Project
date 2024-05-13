package com.Authentication_Service.Authentication_Service.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Authentication_Service.Authentication_Service.Model.Books_Request;

@Repository
public interface BooksRequestRepository extends JpaRepository<Books_Request, Integer> {
    Books_Request findByBookisbnAndUserid(int bookisbn, int userid);
    List<Books_Request> getAllBookRequestsByBookisbn(int isbn);
}


