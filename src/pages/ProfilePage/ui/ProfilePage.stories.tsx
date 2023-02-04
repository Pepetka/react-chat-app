import { Meta, StoryFn } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';
import { getProfilePagePath } from '@/shared/const/router';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { User } from '@/entities/User';
import image from '@/shared/assets/images/image.jpg';
import { rest } from 'msw';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';
import { Social } from '@/features/SocialCard/model/types/socialCardSchema';
import { Post } from '@/entities/Post/model/types/postSchema';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	decorators: [RouterDecorator(getProfilePagePath('6cbdb793'))],
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = (args) => <ProfilePage />;

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

const friends: Array<DeepPartial<User>> = [
	{
		id: '6cbdb794',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb795',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Oleg',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb796',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Pavel',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

const author: DeepPartial<User> = {
	id: '6cbdb793',
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
};

const posts: Array<Post> = [
	{
		id: '0',
		author: author as User,
		img: image,
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '1',
		author: author as User,
		img: image,
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '2',
		author: author as User,
		img: image,
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
];

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb793&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = { relations: 'nobody' };

				return res(ctx.json(relations));
			},
		),
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			const social: Social = {
				followersNum: '101',
				followingNum: '202',
				groupsNum: '303',
			};

			return res(ctx.json(social));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(friends));
		}),
		rest.get(`${__API__}posts?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(posts));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb793&friendId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.status(403));
			},
		),
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}posts?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
