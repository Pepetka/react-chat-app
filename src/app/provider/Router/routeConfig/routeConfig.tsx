import {
	AppRoutes,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';

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
};
