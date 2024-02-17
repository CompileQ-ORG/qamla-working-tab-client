import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useEmployee from '../../hooks/useEmployee';
import { Navigate, useLocation } from 'react-router-dom';

const EmployeeRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isEmployee, isEmployeeLoading] = useEmployee(user?.email)
    const location = useLocation();

    if (loading || isEmployeeLoading) {
        return <h2>Loading!!!</h2>
    }

    if (user && isEmployee) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default EmployeeRoute;