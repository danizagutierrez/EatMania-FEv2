import React, { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

interface RouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<RouteProps> = ({ children }) :any => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useAppSelector((state: RootState) => state.auth.user);
    if (!isAuthenticated) {
        return <Navigate to="/sign" />;
    } else if (isAuthenticated && user.is_admin) {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default PrivateRoute;
