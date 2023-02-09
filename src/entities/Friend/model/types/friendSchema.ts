import { UserMini } from '@/shared/types/userCard';

export interface FriendSchema {
	search: string;
}

export interface UsersLists {
	Friends?: Array<UserMini>;
	Followers?: Array<UserMini>;
	Following?: Array<UserMini>;
	Others?: Array<UserMini>;
}
