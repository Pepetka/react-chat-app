import { rest } from 'msw';
import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { UserMini } from '@/shared/types/userCard';
import { Post, PostStats } from '@/entities/Post';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { PostListWithComments } from './PostListWithComments';

export default {
	title: 'features/PostListWithComments/PostListWithComments',
	component: PostListWithComments,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100%',
						height: '100%',
					}}
				>
					<StoryComponent />
				</div>
			);
		},
	],
} as Meta<typeof PostListWithComments>;

const Template: StoryFn<typeof PostListWithComments> = (args) => (
	<PostListWithComments {...args} />
);

const author: UserMini = {
	id: '6cbdb793',
	name: 'Ivan Ivanov',
	avatar: image,
};

const posts: Array<Post> = [
	{
		id: '0',
		author,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '1',
		author,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '2',
		author,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
];

const postStats: PostStats = {
	comments: '10',
	dislikes: '10',
	likes: '10',
	shared: '10',
	isDisliked: true,
	isLiked: true,
	isShared: true,
};

export const Normal = Template.bind({});
Normal.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}posts`, (_req, res, ctx) => {
			return res(ctx.json({ posts, endReached: true }));
		}),
		rest.get(`${__API__}postStats`, (_req, res, ctx) => {
			return res(ctx.json(postStats));
		}),
	],
};

export const Loading = Template.bind({});
Loading.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Loading.parameters = {
	msw: [
		rest.get(`${__API__}posts`, (_req, res, ctx) => {
			return res(ctx.json({ posts, endReached: true }), ctx.delay('infinite'));
		}),
		rest.get(`${__API__}postStats`, (_req, res, ctx) => {
			return res(ctx.json(postStats), ctx.delay('infinite'));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}posts`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}postStats`, (_req, res, ctx) => {
			return res(ctx.json(postStats));
		}),
	],
};
