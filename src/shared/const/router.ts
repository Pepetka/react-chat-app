export enum AppRoutes {
	MAIN = 'Main',
	PROFILE = 'Profile',
}

export const getMainPagePath = () => {
	return '/';
};

export const getProfilePagePath = (id: string) => {
	return `/profile/${id}`;
};
