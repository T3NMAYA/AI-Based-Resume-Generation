// pages/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/ResumeService";
import toast from "react-hot-toast";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    // pages/Login.js
const onSubmit = async (data) => {
    try {
        const response = await loginUser(data);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Login successful!");
        navigate(from, { replace: true });
    } catch (error) {
        toast.error(error.response?.data || "Invalid email or password");
    }
};

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="card w-full max-w-md bg-neutral/80 backdrop-blur-md shadow-2xl border border-primary/20">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold justify-center text-white mb-4">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: "Email is required" })}
                                className={`input input-bordered w-full bg-base-100/50 ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                                className={`input input-bordered w-full bg-base-100/50 ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="divider text-gray-400">OR</div>
                    <button className="btn btn-secondary">Sign in with Google</button>
                    <div className="text-center mt-4">
                        <Link to="/change-password" className="link link-hover text-gray-400">Forgot Password?</Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/register" className="link link-hover text-gray-400">Don't have an account? Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;