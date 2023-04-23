import {
	AppRoutes,
	getChatsPagePath,
	getFriendsPagePath,
	getGroupPagePath,
	getGroupsListPagePath,
	getLoginPagePath,
	getMainPagePath,
	getMessengerPagePath,
	getProfilePagePath,
	getRegisterPagePath,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { FriendsPage } from '@/pages/FriendsPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { MessengerPage } from '@/pages/MessengerPage';
import { GroupsListPage } from '@/pages/GroupsListPage';
import { GroupPage } from '@/pages/GroupPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
	[AppRoutes.CHATS]: {
		path: getChatsPagePath(),
		element: <ChatsPage />,
		authOnly: true,
	},
	[AppRoutes.MESSENGER]: {
		path: getMessengerPagePath(':id'),
		element: <MessengerPage />,
		authOnly: true,
	},
	[AppRoutes.GROUPS_LIST]: {
		path: getGroupsListPagePath(':id'),
		element: <GroupsListPage />,
		authOnly: true,
	},
	[AppRoutes.GROUP]: {
		path: getGroupPagePath(':id'),
		element: <GroupPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: '/*',
		element: <NotFoundPage />,
		authOnly: true,
	},
};
