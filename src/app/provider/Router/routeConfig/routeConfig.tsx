import {
	AppRoutes,
	getFriendsPagePath,
	getLoginPagePath,
	getMainPagePath,
	getProfilePagePath,
	getRegisterPagePath,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { FriendsPage } from '@/pages/FriendsPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getMainPagePath(),
		element: <MainPage />,
		authOnly: true,
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
	[AppRoutes.REGISTER]: {
		path: getRegisterPagePath(),
		element: <RegisterPage />,
		authOnly: false,
	},
	[AppRoutes.FRIENDS]: {
		path: getFriendsPagePath(':id'),
		element: <FriendsPage />,
		authOnly: true,
	},
};
