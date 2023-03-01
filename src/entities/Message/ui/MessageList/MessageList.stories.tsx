import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { Messages } from '../../model/types/messageSchema';
import { MessageList } from './MessageList';

export default {
	title: 'entities/Message/MessageList',
	component: MessageList,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof MessageList>;

const Template: StoryFn<typeof MessageList> = (args) => (
	<MessageList {...args} />
);

const messages: Messages = [
	[
		'03.02.2023',
		[
			{
				authorId: '0',
				text: 'Hi',
				name: 'Max Ivanov',
				time: '12:48',
			},
			{
				authorId: '1',
				text: 'Hello',
				name: 'Ivan Ivanov',
				time: '12:49',
			},
			{
				authorId: '0',
				text: 'Hello',
				name: 'Ivan Ivanov',
				time: '12:30',
			},
		],
	],
	[
		'04.02.2023',
		[
			{
				authorId: '0',
				text: 'Hi',
				name: 'Max Ivanov',
				time: '12:48',
			},
			{
				authorId: '1',
				text: 'Hello',
				name: 'Ivan Ivanov',
				time: '12:49',
			},
		],
	],
	[
		'02.02.2023',
		[
			{
				authorId: '0',
				text: 'Hi',
				name: 'Max Ivanov',
				time: '12:48',
			},
			{
				authorId: '1',
				text: 'Hello',
				name: 'Ivan Ivanov',
				time: '12:49',
			},
		],
	],
];

export const Normal = Template.bind({});
Normal.args = {
	userId: '1',
	messages,
};
