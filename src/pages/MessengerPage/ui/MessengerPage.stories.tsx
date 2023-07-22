import { Meta, StoryFn } from '@storybook/react';
import { StateSchema } from '@/app/provider/Store';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Messages } from '@/entities/Message';
import { WithCallbackDecorator } from '@/shared/config/storybook/decorators/WithCallbackDecorator/WithCallbackDecorator';
import { mockServerSocket } from '@/shared/config/storybook/mocks/socketMock/socketMock';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import MessengerPage from './MessengerPage';

export default {
	title: 'pages/MessengerPage',
	component: MessengerPage,
	decorators: [RouterDecorator('/chats/0?friendId=1', '/chats/:id')],
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

const response: { messages: Messages; chatMembers: Record<string, UserMini> } =
	{
		chatMembers: {
			'0': {
				id: '0',
				name: 'Vlad Kuznetsov',
				avatar: image,
			},
			'1': {
				id: '1',
				name: 'Ivan Ivanov',
				avatar: image,
			},
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
Normal.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['0', '1']);
		});

		mockServerSocket.on('get_messages', () => {
			mockServerSocket.emit('messages', response);
		});
	}),
];

export const Error = Template.bind({});
Error.decorators = [StoreDecorator(state as StateSchema)];
