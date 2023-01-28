import { User } from '@/entities/User';

export interface Comment {
	id: string;
	text: string;
	author: User;
	postId: string;
	createdAt: string;
}

export interface CommentSchema {
	text: string;
}
