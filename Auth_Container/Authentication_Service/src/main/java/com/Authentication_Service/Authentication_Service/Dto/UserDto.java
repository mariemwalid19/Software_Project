package com.Authentication_Service.Authentication_Service.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class UserDto {
    @NotBlank(message = "Username cannot be blank")
    private String username = "";

    @NotNull(message = "Password hash cannot be null")
    private byte[] passwordHash = new byte[32];

    @NotNull(message = "Password salt cannot be null")
    private byte[] passwordSalt = new byte[32];

    @PositiveOrZero(message = "Number of borrowed books must be zero or positive")
    private Integer numOfBorrowedBooks;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(byte[] passwordHash) {
        this.passwordHash = passwordHash;
    }

    public byte[] getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(byte[] passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public Integer getNumOfBorrowedBooks() {
        return numOfBorrowedBooks;
    }

    public void setNumOfBorrowedBooks(Integer numOfBorrowedBooks) {
        this.numOfBorrowedBooks = numOfBorrowedBooks;
    }
}
