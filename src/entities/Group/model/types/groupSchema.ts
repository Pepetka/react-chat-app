export interface Group {
	id: string;
	ownerId: string;
	name: string;
	tags: Array<string>;
	description: string;
	avatar: string;
	createdAt: string;
}

export interface GroupsList {
	userGroups: Array<Group>;
	otherGroups: Array<Group>;
}

export interface GroupDataFormInputs {
	name: string;
	tags: string | undefined;
	description: string | undefined;
	avatar: any;
}

export interface GroupSchema {
	search: string;
}
