import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useManager from '../../hooks/useManager';

const ManagerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isManager, isManagerLoading] = useManager(user?.email)
    const location = useLocation();

    if (loading || isManagerLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user && isManager) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default ManagerRoute;