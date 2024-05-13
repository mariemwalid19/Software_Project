package com.Authentication_Service.Authentication_Service.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import  com.Authentication_Service.Authentication_Service.DtoReturn.BookDtoReturn;
import  com.Authentication_Service.Authentication_Service.Services.SearchService;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "*")

public class SearchController {
    private SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/SearchWithBookTitle/{userid}")
    public ResponseEntity<?> searchByTitle(@RequestParam("booktitle") String booktitle,@PathVariable("userid") int userid) {
        List<BookDtoReturn> books = searchService.searchByTitle(booktitle,userid);
        if (books.isEmpty()) {
            return new ResponseEntity<>("There is no book for this title", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(books);
    }
}
