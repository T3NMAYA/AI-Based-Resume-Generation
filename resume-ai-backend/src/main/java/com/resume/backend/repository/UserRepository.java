package com.resume.backend.repository;

import com.resume.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}