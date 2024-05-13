package com.Authentication_Service.Authentication_Service.Model;

import java.time.LocalDate;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books_request")
public class Books_Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int requestid;

    @NotNull
    @Column(name = "userid")
    private Integer userid;

    @NotNull
    @Column(name = "bookISBN")
    private Integer bookisbn;
    
    @Nullable
    @Future(message = "Return date must be in the future")
    @Column(name = "return_date")
    private LocalDate returndate;

}
