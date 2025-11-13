// pages/ChangePassword.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/ResumeService";
import toast from "react-hot-toast";

function ChangePassword() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
            setValue("email", loggedInUser.email);
        }
    }, [navigate, setValue]);

    const onSubmit = async (data) => {
        try {
            await changePassword(data);
            toast.success("Password changed successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data || "Failed to change password");
        }
    };

    if (!user) return null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Change Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input input-bordered"
                                disabled
                            />
                            {errors.email && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Old Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("oldPassword", { required: true })}
                                className="input input-bordered"
                            />
                            {errors.oldPassword && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("newPassword", { required: true })}
                                className="input input-bordered"
                            />
                            {errors.newPassword && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;