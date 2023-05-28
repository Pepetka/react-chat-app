export interface GroupRole {
	groupId: string;
	userId: string;
	role: 'admin' | 'moderator' | 'member';
}
