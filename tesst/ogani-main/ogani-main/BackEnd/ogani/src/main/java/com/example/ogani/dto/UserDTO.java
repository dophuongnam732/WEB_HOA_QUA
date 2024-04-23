package com.example.ogani.dto;

import com.example.ogani.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    private String email;

    private String firstname;

    private String lastname;

    private String password;

    private String country;

    private String state;

    private String address;

    private String phone;

    private String verificationCode;

    private Integer status;

    private Set<Role> roles = new HashSet<>();
}
