import { UserMini } from '@/shared/types/userCard';

export interface Comment {
	id: string;
	text: string;
	author: UserMini;
	postId: string;
	createdAt: string;
}
