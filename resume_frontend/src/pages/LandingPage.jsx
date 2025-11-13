import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        // This now navigates directly to the generate-resume page
        navigate("/generate-resume");
    };

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="relative min-h-screen bg-base-100 text-white overflow-hidden">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        color: {
                            value: "#0D1117",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.2,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Resume Builder
          </span>
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
                    Transform your career prospects. Create a professional, ATS-friendly resume in minutes with the power of AI.
                </p>
                <button onClick={handleGetStarted} className="btn btn-primary btn-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Create Your Resume Now
                </button>
            </div>
        </div>
    );
};

export default LandingPage;