package com.Authentication_Service.Authentication_Service.Model;

//import org.springframework.data.annotation.Id;
import java.time.LocalDate;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "borrowed_books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Borrowed_Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BorrowId")
    private int borrowid;
    
    @NotNull
    @Column(name = "userid")
    private Integer userid;

    @NotNull
    @Column(name = "bookISBN")
    private Integer bookisbn;

    @NotNull
    @Column(name = "BorrowDate")
    private LocalDate borrowdate;

    @NotNull
    @Column(name = "DueDate")
    private LocalDate duedate;

    @Nullable
    @Column(name = "ReturnDate")
    private LocalDate returndate;

}
