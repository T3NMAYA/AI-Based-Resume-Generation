package com.resume.backend;

import jakarta.validation.constraints.NotBlank;

public record ResumeRequest(
        @NotBlank(message = "User description is required")
        String userDescription
) {
}