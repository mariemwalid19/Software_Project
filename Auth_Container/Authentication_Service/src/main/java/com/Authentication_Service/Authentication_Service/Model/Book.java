package com.Authentication_Service.Authentication_Service.Model;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ISBN;

    @NotBlank(message = "Book title is required")
    @Size(max = 50, message = "Book title must be less than or equal to 50 characters")
    @Column(length = 50, unique = true)
    private String booktitle;

    @NotBlank(message = "Author is required")
    @Size(max = 50, message = "Author name must be less than or equal to 50 characters")
    @Column(length = 50)
    private String author;

    @Positive(message = "Rack number must be positive")
    private Integer racknumber;

    @NotBlank(message = "Description is required")
    @Size(max = 2500, message = "Description must be less than or equal to 2500 characters")
    @Column(length = 2500)
    private String description;

    @Nullable
    @Size(min = 1, max = 10485760, message = "Book image size must be between 1 and 10485760 bytes")
    @Lob
    private byte[] bookimage;

    private boolean availabilitystatus;

}
