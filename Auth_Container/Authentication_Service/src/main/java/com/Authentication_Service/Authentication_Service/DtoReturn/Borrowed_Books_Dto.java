package com.Authentication_Service.Authentication_Service.DtoReturn;

import java.time.LocalDate;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Borrowed_Books_Dto {

    @Positive(message = "User ID must be a positive number")
    private int userid;

    @Positive(message = "Book ISBN must be a positive number")
    private int bookisbn;

    @NotNull(message = "Borrow date must be specified")
    @FutureOrPresent(message = "Borrow date must be in the present or future")
    private LocalDate borrowdate;

    @NotNull(message = "Due date must be specified")
    @FutureOrPresent(message = "Due date must be in the present or future")
    private LocalDate duedate;
    @Nullable
    private LocalDate returndate;
}
