import { UserMini } from '@/shared/types/userCard';

export interface Chat {
	id: string;
	user: UserMini;
	lastMessage: string;
	createdAt: string;
}

export interface ChatSchema {
	search: string;
}
