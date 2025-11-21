package com.resume.backend.controller;

import com.resume.backend.config.JwtUtil;
import com.resume.backend.entity.User;
import com.resume.backend.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class UserDTO {
    private String email;
    private String fullName;

    public UserDTO(User user) {
        this.email = user.getEmail();
        this.fullName = user.getFullName();
    }

    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
}

class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class PasswordChangeRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Old password is required")
    private String oldPassword;

    @NotBlank(message = "New password is required")
    private String newPassword;

    public PasswordChangeRequest() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/resumeForm")
    public String showResumeForm() {
        return "resumeForm";
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        logger.info("Registering user: {}", user.getEmail());
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(400).body("Email already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User successfully registered");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        User existingUser = userRepository.findByEmail(loginRequest.getEmail());
        if (existingUser != null && passwordEncoder.matches(loginRequest.getPassword(), existingUser.getPassword())) {
            UserDTO userDTO = new UserDTO(existingUser);
            String token = jwtUtil.generateToken(existingUser.getEmail());
            Map<String, Object> response = new HashMap<>();
            response.put("user", userDTO);
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/changePassword")
    public String showChangePasswordForm() {
        return "changePassword";
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@Valid @RequestBody PasswordChangeRequest request) {
        logger.info("Change password request for email: {}", request.getEmail());
        User existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser != null && passwordEncoder.matches(request.getOldPassword(), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(existingUser);
            return ResponseEntity.ok("Password changed successfully!");
        } else {
            return ResponseEntity.status(400).body("Invalid email or old password");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        logger.info("Fetching all registered users");
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        logger.info("Delete request for email: {}", email);
        if (userRepository.existsById(email)) {
            userRepository.deleteById(email);
            return ResponseEntity.ok("User account deleted successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}