// pages/GenerateResume.js
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateResume } from "../api/ResumeService";
import toast from "react-hot-toast";

function GenerateResume() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await generateResume(data.userDescription);
            toast.success("Resume generated successfully!");
            // Optionally store resume data in localStorage or redirect
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data || "Failed to generate resume");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Generate Resume</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resume Description</span>
                            </label>
                            <textarea
                                {...register("userDescription", { required: true })}
                                className="textarea textarea-bordered"
                                placeholder="Enter your resume description"
                            />
                            {errors.userDescription && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Generate Resume
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GenerateResume;