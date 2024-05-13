package com.Authentication_Service.Authentication_Service.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "user_profiles")

public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userProfileid;

    @NotNull
    @Column(name = "userid")
    private Integer userid;

    @NotBlank
    @Size(max = 25)
    @Column(length = 25)
    private String fname = "";

    @NotBlank
    @Size(max = 25)
    @Column(length = 25)
    private String lname = "";

    @NotBlank
    @Email(message = "Please enter a valid email address")
    @Size(max = 50)
    @Column(length = 50)
    private String email = "";

    @Lob
    private byte[] profileimage;
}