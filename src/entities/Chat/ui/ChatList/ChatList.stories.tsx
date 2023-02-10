import { Meta, StoryFn } from '@storybook/react';
import { ChatList } from './ChatList';
import { Chat } from '../../model/types/chatSchema';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';

export default {
	title: 'entities/Chat/ChatList',
	component: ChatList,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof ChatList>;

const Template: StoryFn<typeof ChatList> = (args) => <ChatList {...args} />;

const chats: Array<Chat> = [
	{
		user: {
			avatar: image,
			firstname: 'Ivan',
			lastname: 'Ivanov',
			id: '1',
		},
		createdAt: '11:45 03.02.2023',
		lastMessage:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cumque dignissimos doloremque' +
			' magnam nesciunt, non odio quo reprehenderit sit voluptatibus!',
		id: '0',
	},
	{
		user: {
			avatar: image,
			firstname: 'Ivan',
			lastname: 'Ivanov',
			id: '1',
		},
		createdAt: '11:45 03.02.2023',
		lastMessage:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cumque dignissimos doloremque' +
			' magnam nesciunt, non odio quo reprehenderit sit voluptatibus!',
		id: '1',
	},
	{
		user: {
			avatar: image,
			firstname: 'Ivan',
			lastname: 'Ivanov',
			id: '1',
		},
		createdAt: '11:45 03.02.2023',
		lastMessage:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cumque dignissimos doloremque' +
			' magnam nesciunt, non odio quo reprehenderit sit voluptatibus!',
		id: '2',
	},
];

export const Normal = Template.bind({});
Normal.args = {
	chats,
};
