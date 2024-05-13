package com.Authentication_Service.Authentication_Service.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import  com.Authentication_Service.Authentication_Service.DtoReturn.BooksRequestDtoReturn;
import  com.Authentication_Service.Authentication_Service.DtoReturn.UserRegisterRequestDtoReturn;
import  com.Authentication_Service.Authentication_Service.Services.RequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/request")
@CrossOrigin(origins = "*")

public class BorrowingRequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping("/GetAllBorrowingRequests")
    public ResponseEntity<?> getAllBorrowingRequests() {
        List<BooksRequestDtoReturn> requests = requestService.getAllBorrowingRequests();
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no requests");
        }
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/SendBorrowRequest/{userId}/{ISBN}")
    public ResponseEntity<?> sendBookBorrowRequest(HttpServletRequest request, @PathVariable int ISBN, @PathVariable int userId) {
       String response= requestService.sendBookBorrowRequest(ISBN, userId);
        if(!response.startsWith("the request have been sent Successfully")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok("the request has been sent successfully");
    }

    @PostMapping("/AcceptBorrowRequest")
    public ResponseEntity<?> acceptBorrowRequest( BooksRequestDtoReturn request) {
        boolean isRequestAccepted = requestService.acceptBorrowRequest(request);

        if (isRequestAccepted) {
            return ResponseEntity.ok("the request has been approved successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" user or book not found");
        }
    }

    @PostMapping("/RejectBorrowRequest")
    public ResponseEntity<?> rejectBorrowRequest( BooksRequestDtoReturn request) {
        boolean isRequestRejected = requestService.rejectBorrowRequest(request);

        if (isRequestRejected) {
            return ResponseEntity.ok("the request has been rejected successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to reject the request");
        }
    }

    @GetMapping("/GetAllRegisterRequests")
    public ResponseEntity<?> GetAllRegisterRequests() {
        List<UserRegisterRequestDtoReturn> requests = requestService.GetAllRegisterRequests();
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("there is no requests");
        }
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/AcceptUserRegisterRequest/{username}")
    public ResponseEntity<?> acceptUserRegisterRequest(@PathVariable String username) {
      boolean result = requestService.acceptUserRegisterRequest(username);
       
      if (result) {
        return ResponseEntity.ok("the user have been approved");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" user or book not found");
    }
    }

    @PostMapping("/RejectUserRegisterRequest/{username}")
    public ResponseEntity<?> rejectUserRegisterRequest(@PathVariable String username) {
        boolean isRequestRejected = requestService.rejectUserRegisterRequest(username);

        if (isRequestRejected) {
            return ResponseEntity.ok("the request has been rejected successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to reject the request");
        }
    }
}
