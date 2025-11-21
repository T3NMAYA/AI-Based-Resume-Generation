import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume"; // <--- CHANGE 1: Import the Resume page
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path="/" element={<Root />}>
                    {/* Public Routes */}
                    <Route path="" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="generate-resume" element={<GenerateResume />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="resume" element={<Resume />} /> {/* <--- CHANGE 2: Add the Route here */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);