package com.Authentication_Service.Authentication_Service.Dto;

import java.time.LocalDate;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Borrowed_Books_Dto {
   private int userid;
    private int bookisbn;

    @NotNull(message = "Borrow date cannot be null")
    private LocalDate borrowdate;

    @NotNull(message = "Due date cannot be null")
    private LocalDate duedate;
    @Nullable
    private LocalDate returndate;


}
