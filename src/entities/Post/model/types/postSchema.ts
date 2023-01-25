import { User } from '@/entities/User';

export interface Post {
	id: string;
	author: User;
	text: string;
	img: string;
	createdAt: string;
}

export interface UserPost {
	userId: string;
	postId: string;
}

export interface PostSchema {
	text: string;
	img: string;
}
