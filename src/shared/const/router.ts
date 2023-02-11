export enum AppRoutes {
	MAIN = 'Main',
	PROFILE = 'Profile',
	LOGIN = 'Login',
	REGISTER = 'Register',
	FRIENDS = 'Friends',
	CHATS = 'Chats',
	MESSENGER = 'Messenger',
}

export const getMainPagePath = () => {
	return '/';
};
export const getProfilePagePath = (id: string) => {
	return `/profile/${id}`;
};
export const getLoginPagePath = () => {
	return '/login';
};
export const getRegisterPagePath = () => {
	return '/register';
};
export const getFriendsPagePath = (id: string, search?: string) => {
	if (search) {
		return `/friends/${id}?search=${search}`;
	}

	return `/friends/${id}`;
};
export const getChatsPagePath = () => {
	return '/chats';
};
export const getMessengerPagePath = (id: string) => {
	return `/chats/${id}`;
};
