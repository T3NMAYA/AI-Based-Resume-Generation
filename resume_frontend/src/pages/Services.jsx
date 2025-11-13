import React from 'react';
import { FaBrain, FaFileAlt, FaBriefcase } from 'react-icons/fa';

const services = [
    {
        icon: <FaBrain />,
        title: "AI Content Generation",
        description: "Our system analyzes your profile to generate tailored resume content that highlights your strengths."
    },
    {
        icon: <FaFileAlt />,
        title: "Professional Templates",
        description: "Choose from a library of modern, recruiter-approved templates designed to make a great first impression."
    },
    {
        icon: <FaBriefcase />,
        title: "Job-Specific Tailoring",
        description: "Optimize your resume for any job description, increasing your chances of landing an interview."
    }
];

function Services() {
    return (
        <div className="bg-base-100 text-gray-200">
            <div className="py-20 px-4 container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2 text-primary">Our Services</h1>
                <p className="text-lg text-gray-400 text-center mb-12">Everything you need to build the perfect resume.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="card bg-neutral shadow-xl border border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-4 text-primary">{service.icon}</div>
                                <h3 className="card-title text-xl font-semibold text-white">{service.title}</h3>
                                <p className="text-gray-300">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;