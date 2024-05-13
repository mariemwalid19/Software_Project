package com.Authentication_Service.Authentication_Service.Dto;

import org.springframework.web.multipart.MultipartFile;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    @NotBlank(message = "Book title cannot be blank")
    private String booktitle = "";

    @NotBlank(message = "Author cannot be blank")
    private String author = "";

    @Positive(message = "Rack number must be positive")
    private int racknumber;

    private String description = "";
    @Nullable
    private MultipartFile bookimage;

}
