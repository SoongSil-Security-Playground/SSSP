import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn || !isAdmin) {
        console.log("Access denied: Admin only", isAdmin);
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;