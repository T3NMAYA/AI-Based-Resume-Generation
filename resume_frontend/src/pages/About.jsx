import React from 'react';
import { FaBullseye, FaDraftingCompass, FaHeart } from 'react-icons/fa';

function About() {
    return (
        <div className="bg-base-100 text-gray-200">
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        About AI Resume Maker
                    </h1>
                    <p className="text-lg text-gray-400 mb-12">
                        We are dedicated to revolutionizing the job application process.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="card bg-neutral shadow-xl border border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body">
                            <h2 className="card-title text-2xl flex items-center gap-2"><FaBullseye className="text-primary" /> Our Mission</h2>
                            <p className="text-gray-300">
                                In today's competitive job market, a standout resume is crucial. Our mission at AI Resume Maker is to empower job seekers by making it easy to create compelling, job-specific resumes in minutes.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-neutral shadow-xl border border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body">
                            <h2 className="card-title text-2xl flex items-center gap-2"><FaDraftingCompass className="text-secondary" /> How It Works</h2>
                            <p className="text-gray-300">
                                Simply provide a description of your skills, experience, and career goals. Our advanced AI analyzes your input to generate a polished and professional resume, complete with stunning templates.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-neutral shadow-xl border border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body">
                            <h2 className="card-title text-2xl flex items-center gap-2"><FaHeart className="text-accent" /> Why Choose Us?</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                <li><strong>Speed and Efficiency:</strong> Create a high-quality resume in a fraction of the time.</li>
                                <li><strong>AI-Powered Precision:</strong> Our tool helps you tailor your resume with relevant keywords.</li>
                                <li><strong>Professional Designs:</strong> Choose from a variety of modern, ATS-friendly templates.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;