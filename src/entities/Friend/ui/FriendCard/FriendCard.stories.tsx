import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { FriendCard } from './FriendCard';

export default {
	title: 'entities/Friend/FriendCard',
	component: FriendCard,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof FriendCard>;

const Template: StoryFn<typeof FriendCard> = (args) => <FriendCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	friend: {
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id',
	},
	withBtn: false,
};

export const WithBtnHover = Template.bind({});
WithBtnHover.args = {
	friend: {
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id',
	},
	btnText: 'Click',
	withBtn: true,
	initialHover: true,
};

export const WithoutBtnHover = Template.bind({});
WithoutBtnHover.args = {
	friend: {
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id',
	},
	withBtn: false,
	initialHover: true,
};
