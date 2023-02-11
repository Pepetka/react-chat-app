export interface Message {
	authorId: string;
	name: string;
	text?: string;
	img?: Array<string>;
	time: string;
}

export type Messages = Record<string, Array<Message>>;

export interface MessageSchema {
	text: string;
	images: string;
}
