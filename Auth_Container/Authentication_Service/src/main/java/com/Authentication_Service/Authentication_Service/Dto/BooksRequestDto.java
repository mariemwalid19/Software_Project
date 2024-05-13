package com.Authentication_Service.Authentication_Service.Dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BooksRequestDto {

    private int userid;

    private int bookisbn;
}


