import React from 'react';
import { Link } from 'react-router-dom';

const AdminSignupErrorPage = () => {

    return (
        <div className="admin-error-container">
            <h1 className="admin-error-title">Access Denied</h1>
            <p className="admin-error-message">
                Sorry, signup for admin is not available. If you believe this is an error, please contact the system administrator.
            </p>
            <Link to="/admin" className="admin-error-home-link">
                Go Back Home
            </Link>
        </div>
    );
};

export default AdminSignupErrorPage;
