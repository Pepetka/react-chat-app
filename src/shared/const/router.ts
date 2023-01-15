export enum AppRoutes {
	MAIN = 'Main',
	PROFILE = 'Profile',
	LOGIN = 'Login',
	REGISTER = 'Register',
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
