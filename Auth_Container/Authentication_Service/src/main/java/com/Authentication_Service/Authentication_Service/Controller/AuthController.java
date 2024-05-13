package com.Authentication_Service.Authentication_Service.Controller;

import java.io.IOException;
import java.security.SignatureException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Authentication_Service.Authentication_Service.Dto.UserLoginRequestDto;
import com.Authentication_Service.Authentication_Service.Dto.UserRegisterRequestDto;
import com.Authentication_Service.Authentication_Service.DtoReturn.UserDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.User;
import com.Authentication_Service.Authentication_Service.Model.UserRegisterRequest;
import com.Authentication_Service.Authentication_Service.Repository.UserRegisterRequestRepository;
import com.Authentication_Service.Authentication_Service.Repository.UserRepository;
import com.Authentication_Service.Authentication_Service.Services.UserRegisterRequestService;

import jakarta.validation.Valid;

@RestController()
@RequestMapping("/Auth")
@CrossOrigin(origins = "*")

public class AuthController {
    private long AllowedSize = 2097152;
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private UserRepository User;
    @Autowired
    private UserRegisterRequestRepository UserRegisterRequest;
    @Autowired
    private UserRegisterRequestService UserRegisterRequestService;

    @PostMapping("/Register")
    public ResponseEntity<String> register(@Valid UserRegisterRequestDto request) {
        String username = request.getUsername().toLowerCase();
        if (username.equals("admin")) {
            return new ResponseEntity<>("username not allowed!", HttpStatus.BAD_REQUEST);
        }
        String email = request.getUsername();
        username = request.getUsername();

        if (User.findByUsername(email) != null) {
            return new ResponseEntity<>("This email already exists!!", HttpStatus.BAD_REQUEST);

        }

        if (UserRegisterRequest.findByEmail(username) != null) {
            return new ResponseEntity<>("This username already exists!!", HttpStatus.BAD_REQUEST);

        }

        if (UserRegisterRequest.findByEmail(email) != null) {
            return new ResponseEntity<>("There is a request with the same credentials", HttpStatus.BAD_REQUEST);

        }

        if (UserRegisterRequest.findByUsername(username) != null) {
            return new ResponseEntity<>("There is a request with the same credentials", HttpStatus.BAD_REQUEST);

        }
        String fileExtension = UserRegisterRequestService
                .getFileExtension(request.getProfileimage().getOriginalFilename());
        if (!UserRegisterRequestService.isAllowedExtension(fileExtension)) {
            return new ResponseEntity<>("Not allowed extension", HttpStatus.BAD_REQUEST);

        }

        if (request.getProfileimage().getSize() > AllowedSize) {
            return new ResponseEntity<>("Not allowed file size", HttpStatus.BAD_REQUEST);

        }
        UserRegisterRequest req = modelMapper.map(request, UserRegisterRequest.class);

        try {
            byte[] profileImageBytes = UserRegisterRequestService
                    .convertMultipartFileToByteArray(request.getProfileimage());
            req.setProfileimage(profileImageBytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
        UserRegisterRequest.save(req);
        return ResponseEntity.ok("the register request has been sent successfully");
    }

    @PostMapping("/Login")
    public ResponseEntity<?> login(@Valid UserLoginRequestDto request) throws SignatureException {
        UserRegisterRequest isRequested = UserRegisterRequest.findByUsername(request.getUsername());
        if (isRequested != null) {
            if (!isRequested.isIsapproved()) {
                return ResponseEntity.badRequest().body("this account is not approved yet!");
            }
        }
        User user = User.findByUsername(request.getUsername());
        if (user == null) {
            return new ResponseEntity<>("incorrect username or password!", HttpStatus.NOT_FOUND);

        } else if (!user.getPassword().equals(request.getPassword())) {
            return new ResponseEntity<>("incorrect username or password!", HttpStatus.NOT_FOUND);

        }

        UserDtoReturn UData = modelMapper.map(user, UserDtoReturn.class);

        return ResponseEntity.ok(UData);
    }
}
