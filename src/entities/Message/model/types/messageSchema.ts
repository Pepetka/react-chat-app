export interface Message {
	id: string;
	authorId: string;
	name: string;
	text?: string;
	img?: Array<string>;
	time: string;
}

export type Messages = Array<[string, Array<Message>]>;

export interface MessageSchema {
	text: string;
	images: string;
}
