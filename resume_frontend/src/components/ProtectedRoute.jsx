import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = localStorage.getItem('user');
    const location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;