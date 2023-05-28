import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StateSchema } from '@/app/provider/Store';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import FriendsPage from './FriendsPage';

export default {
	title: 'pages/FriendsPage',
	component: FriendsPage,
} as Meta<typeof FriendsPage>;

const Template: StoryFn<typeof FriendsPage> = (args) => <FriendsPage />;

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
		authData: user[1],
	},
};

const usersList = [
	{
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id',
	},
	{
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id1',
	},
	{
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id2',
	},
];

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getUsers?userId=1&search=`, (_req, res, ctx) => {
			return res(
				ctx.json({
					Followers: usersList,
					Following: usersList,
					Friends: usersList,
					Others: usersList,
				}),
			);
		}),
	],
};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(`${__API__}getUsers?userId=1&search=`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
