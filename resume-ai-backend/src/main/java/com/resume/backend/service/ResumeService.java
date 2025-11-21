package com.resume.backend.service;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;
<<<<<<< HEAD
    void deleteResume(Long id, String email);
=======
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9
}