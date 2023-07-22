import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { ChatCard } from './ChatCard';

export default {
	title: 'entities/Chat/ChatCard',
	component: ChatCard,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof ChatCard>;

const Template: StoryFn<typeof ChatCard> = (args) => <ChatCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	chat: {
		user: {
			avatar: image,
			name: 'Ivan Ivanov',
			id: '1',
		},
		createdAt: '11:45 03.02.2023',
		lastMessage:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cumque dignissimos doloremque' +
			' magnam nesciunt, non odio quo reprehenderit sit voluptatibus!',
		id: '1',
	},
};
