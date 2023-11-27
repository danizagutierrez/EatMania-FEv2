import React, { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

interface RouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<RouteProps> = ({ children }) : any => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/sign" />;
    }
    return children;
};

export default PrivateRoute;
