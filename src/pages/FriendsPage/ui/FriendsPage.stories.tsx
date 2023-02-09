import { Meta, StoryFn } from '@storybook/react';
import FriendsPage from './FriendsPage';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { StateSchema } from '@/app/provider/Store';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { rest } from 'msw';

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
		firstname: 'Ivan',
		lastname: 'Ivanov',
		id: 'id',
	},
	{
		avatar: image,
		firstname: 'Ivan',
		lastname: 'Ivanov',
		id: 'id1',
	},
	{
		avatar: image,
		firstname: 'Ivan',
		lastname: 'Ivanov',
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
