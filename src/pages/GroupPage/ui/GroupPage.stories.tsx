import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { User, UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Post, PostStats } from '@/entities/Post';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { Group } from '@/entities/Group';
import { GroupRole } from '../model/types/groupPage';
import GroupPage from './GroupPage';

export default {
	title: 'pages/GroupPage',
	component: GroupPage,
} as Meta<typeof GroupPage>;

const Template: StoryFn<typeof GroupPage> = (args) => <GroupPage />;

const user: Array<DeepPartial<User>> = [
	{
		id: '6cbdb793',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

const state: DeepPartial<StateSchema> = {
	user: {
		authData: user[0],
	},
};

const author: UserMini = {
	id: '0',
	name: 'SomeGroup',
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

const group: Array<Group> = [
	{
		avatar: image,
		name: 'Some group',
		id: 'id',
		description: 'Some description',
		createdAt: '03.02.2023',
		tags: [],
		ownerId: '1',
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

const groupRole: Array<GroupRole> = [
	{
		groupId: '0',
		role: 'admin',
		userId: '1',
	},
];

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}groups?Id=0&`, (_req, res, ctx) => {
			return res(ctx.json(group));
		}),
		rest.get(`${__API__}group-members?userId=1&groupId=0`, (_req, res, ctx) => {
			return res(ctx.json(groupRole));
		}),
		rest.get(`${__API__}posts?userId=0`, (_req, res, ctx) => {
			return res(ctx.json(posts));
		}),
		rest.get(`${__API__}postStats?postId=0&userId=1`, (_req, res, ctx) => {
			return res(ctx.json(postStats));
		}),
	],
};
