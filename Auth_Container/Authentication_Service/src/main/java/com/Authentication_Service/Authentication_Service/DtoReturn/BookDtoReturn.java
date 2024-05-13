package com.Authentication_Service.Authentication_Service.DtoReturn;
import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
// @JsonInclude(JsonInclude.Include.NON_NULL)
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDtoReturn {
    @Positive(message = "ISBN must be positive")
    private int ISBN;

    @NotBlank(message = "Book title cannot be blank")
    private String booktitle = "";

    @NotBlank(message = "Author cannot be blank")
    private String author = "";

    @Positive(message = "Rack number must be positive")
    private int racknumber;

    private String description = "";

    @Nullable
    private byte[] bookimage;

    @Nullable
    private String username;

    @Nullable
    private Boolean isborrowed;

}
