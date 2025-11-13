import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
    // We no longer need background classes here as they are now global in index.css
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Root;