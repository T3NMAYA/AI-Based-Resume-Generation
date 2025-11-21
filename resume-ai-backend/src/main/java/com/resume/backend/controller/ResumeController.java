package com.resume.backend.controller;

import com.resume.backend.entity.Resume;
import com.resume.backend.entity.User;
import com.resume.backend.repository.ResumeRepository;
import com.resume.backend.repository.UserRepository;
import com.resume.backend.ResumeRequest;
import com.resume.backend.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeController(ResumeService resumeService, ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeService = resumeService;
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(@Valid @RequestBody ResumeRequest resumeRequest) throws IOException {
        Map<String, Object> stringObjectMap = resumeService.generateResumeResponse(resumeRequest.userDescription());
        return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Resume>> getUserResumes() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Resume> resumes = resumeRepository.findByUser(user);
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }
<<<<<<< HEAD
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(@PathVariable Long id) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            resumeService.deleteResume(id, email);
            return new ResponseEntity<>("Resume deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
=======
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9
}