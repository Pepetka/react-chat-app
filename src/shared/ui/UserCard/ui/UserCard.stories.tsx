import { Meta, StoryFn } from '@storybook/react';
import { UserCard } from './UserCard';

export default {
	title: 'shared/UserCard',
	component: UserCard,
} as Meta<typeof UserCard>;

const Template: StoryFn<typeof UserCard> = (args) => <UserCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
