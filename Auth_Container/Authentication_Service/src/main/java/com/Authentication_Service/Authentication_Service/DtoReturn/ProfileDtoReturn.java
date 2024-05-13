package com.Authentication_Service.Authentication_Service.DtoReturn;
import jakarta.validation.constraints.Email;

public class ProfileDtoReturn {

public String fname;
public String lname;
@Email(message = "Please enter a valid email address")
public String email;
public byte[] profileimage;

}
