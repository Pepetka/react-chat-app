import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { Messages } from '@/entities/Message';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import MessengerPage from './MessengerPage';

export default {
	title: 'pages/MessengerPage',
	component: MessengerPage,
} as Meta<typeof MessengerPage>;

const Template: StoryFn<typeof MessengerPage> = (args) => <MessengerPage />;

const state: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			id: '0',
		},
	},
};

const response: { messages: Messages; friend: UserMini } = {
	friend: {
		id: '1',
		firstname: 'Ivan',
		lastname: 'Ivanov',
		avatar: image,
	},
	messages: [
		[
			'30.01.2023',
			[
				{
					authorId: '0',
					time: '13:11',
					name: 'Ivan Ivanov',
					text: 'Some message',
				},
			],
		],
		[
			'31.01.2023',
			[
				{
					authorId: '1',
					time: '13:11',
					name: 'Vlad Kuznetsov',
					text: 'Some message',
				},
			],
		],
	],
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(
			`${__API__}messages?chatId=&userId=0&friendId=1`,
			(_req, res, ctx) => {
				return res(ctx.json(response));
			},
		),
	],
};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(
			`${__API__}messages?chatId=&userId=0&friendId=1`,
			(_req, res, ctx) => {
				return res(ctx.status(403));
			},
		),
	],
};
