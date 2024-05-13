package com.Authentication_Service.Authentication_Service.Dto;

import org.springframework.data.relational.core.mapping.Embedded.Nullable;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProfileDto {
  
  private String fname;
  private String lname;
  @Email(message = "Please enter a valid email address")
  private String email;
  @Nullable
  private MultipartFile profileimage;
}
