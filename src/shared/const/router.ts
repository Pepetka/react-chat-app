export enum AppRoutes {
	MAIN = 'Main',
	PROFILE = 'Profile',
	LOGIN = 'Login',
	REGISTER = 'Register',
	FRIENDS = 'Friends',
	CHATS = 'Chats',
	MESSENGER = 'Messenger',
	GROUP = 'Group',
	GROUPS_LIST = 'Groups',
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
export const getMessengerPagePath = (id: string, query?: string) => {
	return `/chats/${id}${query ? `?${query}` : ''}`;
};
export const getGroupPagePath = (id: string) => {
	return `/group/${id}`;
};
export const getGroupsListPagePath = (id: string) => {
	return `/groups/${id}`;
};
