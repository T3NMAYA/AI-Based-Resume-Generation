// pages/Register.js
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/ResumeService";
import toast from "react-hot-toast";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("fullName", { required: true })}
                                className="input input-bordered"
                            />
                            {errors.fullName && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input input-bordered"
                            />
                            {errors.email && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="input input-bordered"
                            />
                            {errors.password && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;