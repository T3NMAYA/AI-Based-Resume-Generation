// api/ResumeService.js
import axios from "axios";

export const baseURL = "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: baseURL,
});

// Add request interceptor for JWT token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Resume Generation (Public endpoint, saves if authenticated)
export const generateResume = async (description) => {
    const response = await axiosInstance.post("/api/v1/resume/generate", {
        userDescription: description,
    });
    return response.data;
};

// User Registration
export const registerUser = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

// User Login
export const loginUser = async (loginData) => {
    const response = await axiosInstance.post("/login", loginData);
    return response.data; // Returns { user: { email, fullName }, token }
};

// Change Password (Requires authentication)
export const changePassword = async (passwordData) => {
    const response = await axiosInstance.post("/changePassword", passwordData);
    return response.data;
};

// Delete User (Requires authentication)
export const deleteUser = async (email) => {
    const response = await axiosInstance.delete(`/users/${email}`);
    return response.data;
};

export const deleteResume = async (id) => {
    const response = await axiosInstance.delete(`/api/v1/resume/${id}`);
    return response.data;
};

// Get User's Resumes (Requires authentication)
export const getUserResumes = async () => {
    const response = await axiosInstance.get("/api/v1/resume/list");
    return response.data;
};