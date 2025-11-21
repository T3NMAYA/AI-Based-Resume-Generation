import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateResume } from "../api/ResumeService";
import toast from "react-hot-toast";

function GenerateResume() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    // 1. Add a loading state variable
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        // 2. Start loading
        setIsLoading(true);
        const loadingToast = toast.loading("AI is generating your resume...");

        try {
            await generateResume(data.userDescription);
            
            // 3. Success! Dismiss loading toast and show success
            toast.dismiss(loadingToast);
            toast.success("Resume generated successfully!");

            // 4. Wait 1.5 seconds before redirecting so you can see the message
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {
            // Handle Error
            toast.dismiss(loadingToast);
            toast.error(error.response?.data || "Failed to generate resume");
            setIsLoading(false); // Stop loading so user can try again
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
                                className="textarea textarea-bordered h-32"
                                placeholder="Example: I am a Java Developer with 2 years of experience..."
                                disabled={isLoading} // Disable input while working
                            />
                            {errors.userDescription && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isLoading} // Disable button to prevent double-clicks
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Generating...
                                    </>
                                ) : (
                                    "Generate Resume"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GenerateResume;