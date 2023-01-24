export interface Post {
	id: string;
	authorId: string;
	text: string;
	img: string;
	createdAt: string;
}

export interface PostSchema {
	text: string;
	img: string;
}
