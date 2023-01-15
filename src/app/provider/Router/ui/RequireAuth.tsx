import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { getMainPagePath } from '@/shared/const/router';

interface RequireAuthProps {
	children: JSX.Element;
	authOnly: boolean;
}

export const RequireAuth = ({ children, authOnly }: RequireAuthProps) => {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();

	if ((!auth && authOnly) || (auth && !authOnly)) {
		return (
			<Navigate to={getMainPagePath()} state={{ from: location }} replace />
		);
	}

	return children;
};
