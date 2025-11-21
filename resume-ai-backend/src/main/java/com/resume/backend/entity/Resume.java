package com.resume.backend.entity;

import jakarta.persistence.*;

@Entity
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String resumeData;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getResumeData() { return resumeData; }
    public void setResumeData(String resumeData) { this.resumeData = resumeData; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}