package com.Authentication_Service.Authentication_Service.Controller;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import  com.Authentication_Service.Authentication_Service.Dto.ProfileDto;
import  com.Authentication_Service.Authentication_Service.Model.User;
import  com.Authentication_Service.Authentication_Service.Model.UserProfile;
import  com.Authentication_Service.Authentication_Service.Services.BookService;
import  com.Authentication_Service.Authentication_Service.Services.UserProfileService;
import  com.Authentication_Service.Authentication_Service.Services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")

public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private final ModelMapper modelMapper = new ModelMapper();

    @GetMapping("/GetUserById/{userId}")
    public ResponseEntity<?> getUserByUserId(@Valid @PathVariable Integer userId) {

        Optional<User> user = userService.getUserById(userId);

        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no user with this id");
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @GetMapping("/GetProfile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Integer userId) {
        UserProfile profile = UserProfileService.getProfileByUserId(userId);

        if (profile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("there is no profile with this id");
        }
        // ProfileDtoReturn profilereturn =
        // modelMapper.map(profile,ProfileDtoReturn.class);

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PutMapping("/UpdateProfile/{userid}")
    public ResponseEntity<?> updateProfile(@Valid ProfileDto user__profileDto, @PathVariable Integer userid) {
        String message = UserProfileService.updateProfile(userid, user__profileDto);

        if (message.startsWith("there is no profile")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
