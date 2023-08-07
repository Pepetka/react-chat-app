import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import { getUserAuthData } from '@/entities/User';
import { getLoginPagePath, getProfilePagePath } from '@/shared/const/router';

interface RequireAuthProps {
	children: ReactElement;
	authOnly: boolean;
}

export const RequireAuth = ({ children, authOnly }: RequireAuthProps) => {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();

	if (!auth && authOnly) {
		return (
			<Navigate to={getLoginPagePath()} state={{ from: location }} replace />
		);
	}

	if (auth && !authOnly) {
		return (
			<Navigate
				to={getProfilePagePath(auth.id)}
				state={{ from: location }}
				replace
			/>
		);
	}

	return children;
};
