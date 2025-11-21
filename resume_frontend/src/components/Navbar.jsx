import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navClass = isScrolled
        ? "navbar fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 bg-black bg-opacity-50 backdrop-blur-md shadow-lg"
        : "navbar fixed top-0 left-0 w-full z-50 text-white transition-all duration-300";

    return (
        <div className={navClass}>
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    AI Resume Maker
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt="User" src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52 text-white">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-outline">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;