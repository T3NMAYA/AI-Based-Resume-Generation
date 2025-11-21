package com.resume.backend.repository;

import com.resume.backend.entity.Resume;
import com.resume.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUser(User user);
}