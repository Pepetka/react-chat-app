import { Meta, StoryFn } from '@storybook/react';
import { FriendList } from './FriendList';

export default {
	title: 'entities/FriendList',
	component: FriendList,
} as Meta<typeof FriendList>;

const Template: StoryFn<typeof FriendList> = (args) => <FriendList />;

export const Normal = Template.bind({});
Normal.args = {};
