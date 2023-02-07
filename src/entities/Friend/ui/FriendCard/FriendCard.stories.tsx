import { Meta, StoryFn } from '@storybook/react';
import { FriendCard } from './FriendCard';

export default {
	title: 'entities/FriendCard',
	component: FriendCard,
} as Meta<typeof FriendCard>;

const Template: StoryFn<typeof FriendCard> = (args) => <FriendCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
