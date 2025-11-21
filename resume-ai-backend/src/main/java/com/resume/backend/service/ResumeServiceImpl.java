package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.entity.Resume;
import com.resume.backend.entity.User;
import com.resume.backend.repository.ResumeRepository;
import com.resume.backend.repository.UserRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
<<<<<<< HEAD
import java.util.NoSuchElementException; // Import for exception handling
=======
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ChatClient chatClient;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ResumeServiceImpl(ChatClient.Builder builder, ResumeRepository resumeRepository, UserRepository userRepository) {
        this.chatClient = builder.build();
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription
        ));
        Prompt prompt = new Prompt(promptContent);
        String response = chatClient.prompt(prompt).call().content();
        Map<String, Object> stringObjectMap = parseMultipleResponses(response);

        String email = SecurityContextHolder.getContext().getAuthentication() != null
                ? SecurityContextHolder.getContext().getAuthentication().getName()
                : null;
        if (email != null) {
            User currentUser = userRepository.findByEmail(email);
            if (currentUser != null) {
                String resumeJson = objectMapper.writeValueAsString(stringObjectMap.get("data"));
                Resume resume = new Resume();
                resume.setResumeData(resumeJson);
                resume.setUser(currentUser);
                resumeRepository.save(resume);
            }
        }

        return stringObjectMap;
    }

<<<<<<< HEAD
    // --- NEW DELETE METHOD IMPLEMENTATION ---
    @Override
    public void deleteResume(Long id, String email) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resume not found with id: " + id));

        // Security check: Ensure the resume belongs to the logged-in user
        if (!resume.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You are not authorized to delete this resume");
        }

        resumeRepository.deleteById(id);
    }
    // -----------------------------------------------------------------

=======
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9
    String loadPromptFromFile(String filename) throws IOException {
        Path path = new ClassPathResource(filename).getFile().toPath();
        return Files.readString(path);
    }

    String putValuesToTemplate(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return template;
    }

    public static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();
        int thinkStart = response.indexOf("<think>") + 7;
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
        } else {
            jsonResponse.put("think", null);
        }

        int jsonStart = response.indexOf("```json");
        int jsonEnd = response.lastIndexOf("```");
        if (jsonStart != -1 && jsonEnd != -1 && jsonStart < jsonEnd) {
            String jsonContent = response.substring(jsonStart + 7, jsonEnd).trim();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
                jsonResponse.put("data", dataContent);
            } catch (Exception e) {
                jsonResponse.put("data", null);
                System.err.println("Invalid JSON format in the response: " + e.getMessage());
            }
        } else {
            jsonResponse.put("data", null);
        }

        return jsonResponse;
    }
}