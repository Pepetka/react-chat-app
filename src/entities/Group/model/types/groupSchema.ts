export interface Group {
	id: string;
	ownerId: string;
	name: string;
	tags: Array<string>;
	description: string;
	avatar: string;
	createdAt: string;
}

export interface GroupSchema {
	search: string;
}
