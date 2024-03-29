export enum AppRoutes {
	MAIN = 'Main',
	PROFILE = 'Profile',
	EDIT_PROFILE = 'Edit profile',
	LOGIN = 'Login',
	REGISTER = 'Register',
	FRIENDS = 'Friends',
	CHATS = 'Chats',
	MESSENGER = 'Messenger',
	GROUP = 'Group',
	EDIT_GROUP = 'Edit group',
	GROUPS_LIST = 'Groups',
	CREATE_GROUP = 'Create group',
	NOT_FOUND = 'NotFound',
}

export const getMainPagePath = () => {
	return '/';
};
export const getProfilePagePath = (id: string) => {
	return `/profile/${id}`;
};
export const getEditProfilePagePath = (id: string) => {
	return `/profile/${id}/edit`;
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
export const getEditGroupPagePath = (id: string) => {
	return `/group/${id}/edit`;
};
export const getGroupsListPagePath = (id: string) => {
	return `/groups/${id}`;
};
export const getCreateGroupPagePath = (id: string) => {
	return `/groups/${id}/create`;
};
