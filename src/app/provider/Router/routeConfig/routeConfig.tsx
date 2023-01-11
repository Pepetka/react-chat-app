import {
	AppRoutes,
	getLoginPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getMainPagePath(),
		element: <MainPage />,
		authOnly: false,
	},
	[AppRoutes.PROFILE]: {
		path: getProfilePagePath(':id'),
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRoutes.LOGIN]: {
		path: getLoginPagePath(),
		element: <LoginPage />,
		authOnly: false,
	},
};
