import { User } from '@/shared/types/userCard';

export interface UserSchema {
	authData?: User;
	_inited: boolean;
}
