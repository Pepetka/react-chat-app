import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { User, UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Post, PostStats } from '../../model/types/postSchema';
import { PostCard } from './PostCard';

export default {
	title: 'entities/Post/PostCard',
	component: PostCard,
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

const author: UserMini = {
	id: '6cbdb793',
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
};

const post: Post = {
	id: '0',
	author: author as User,
	img: [image, image, image],
	createdAt: '14:24 24.01.2023',
	text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
};

const postStats: PostStats = {
	comments: '10',
	dislikes: '10',
	likes: '10',
	shared: '10',
	isDisliked: true,
	isLiked: true,
	isShared: true,
};

export const WithSettings = Template.bind({});
WithSettings.args = {
	post,
	userId: '6cbdb793',
	admin: true,
};
WithSettings.parameters = {
	msw: [
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	post,
	userId: '6cbdb793',
};
WithoutSettings.parameters = {
	msw: [
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};
