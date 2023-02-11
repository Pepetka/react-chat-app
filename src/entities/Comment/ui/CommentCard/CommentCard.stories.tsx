import { Meta, StoryFn } from '@storybook/react';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { CommentCard } from './CommentCard';

export default {
	title: 'entities/Comment/CommentCard',
	component: CommentCard,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

const author: DeepPartial<User> = {
	avatar: image,
	firstname: 'Ivan',
	lastname: 'Ivanov',
};

export const WithSettings = Template.bind({});
WithSettings.args = {
	comment: {
		id: '0',
		author: author as User,
		createdAt: '14:24 24.01.2023',
		text: 'Some comment text',
		postId: '0',
	},
	admin: true,
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	comment: {
		id: '0',
		author: author as User,
		createdAt: '14:24 24.01.2023',
		text: 'Some comment text',
		postId: '0',
	},
};
