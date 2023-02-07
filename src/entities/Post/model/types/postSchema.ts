import { User } from '@/shared/types/userCard';

export interface Post {
	id: string;
	author: User;
	text: string;
	img?: Array<string>;
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

export interface PostStats {
	likes: string;
	dislikes: string;
	comments: string;
	shared: string;
	isLiked: boolean;
	isDisliked: boolean;
	isShared: boolean;
}
