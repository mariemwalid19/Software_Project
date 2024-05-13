package com.Authentication_Service.Authentication_Service.DtoReturn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BooksRequestDtoReturn {
   private String username;
   private String booktitle;
}
