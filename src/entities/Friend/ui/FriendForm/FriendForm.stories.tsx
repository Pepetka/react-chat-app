import { Meta, StoryFn } from '@storybook/react';
import { FriendForm } from './FriendForm';

export default {
	title: 'entities/FriendForm',
	component: FriendForm,
} as Meta<typeof FriendForm>;

const Template: StoryFn<typeof FriendForm> = (args) => <FriendForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
