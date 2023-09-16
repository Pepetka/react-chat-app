export interface User {
	id: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	age: number;
	createdAt: string;
	avatar: string;
	status?: string;
	accessToken?: string;
	refreshToken?: string;
}

export type UserMini = Pick<User, 'id' | 'avatar'> & { name: string };
