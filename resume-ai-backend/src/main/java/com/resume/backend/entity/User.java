package com.resume.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class User {
    @Id
    @Column(length = 255)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Column(length = 100)
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Column(length = 255)
    @NotBlank(message = "Password is required")
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}