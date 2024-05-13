package com.Authentication_Service.Authentication_Service.Dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequestDto {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "First name is required")
    @Size(max = 25, message = "First name must be at most 25 characters long")
    private String fname;

    @NotBlank(message = "Last name is required")
    @Size(max = 25, message = "Last name must be at most 25 characters long")
    private String lname;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Size(max = 50, message = "Email must be at most 50 characters long")
    private String email;
    
    @NotNull(message = "Profile image is required")
    private MultipartFile profileimage;

    // Getters and setters
}
