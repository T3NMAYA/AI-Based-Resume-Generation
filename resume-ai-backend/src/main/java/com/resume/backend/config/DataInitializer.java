package com.resume.backend.config;

import com.resume.backend.entity.User;
import com.resume.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if any user exists; create default user only if table is empty
        if (userRepository.count() == 0) {
            User defaultUser = new User();
            defaultUser.setEmail("anmol@gmail.com");
            defaultUser.setFullName("Default Admin");
            defaultUser.setPassword(passwordEncoder.encode("test")); // Default password: test
            userRepository.save(defaultUser);
            System.out.println("Default user created with email: anmol@gmail.com and password: test");
        }
    }
}