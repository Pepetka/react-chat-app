import { Meta, StoryFn } from '@storybook/react';
import GroupsListPage from './GroupsListPage';

export default {
	title: 'pages/GroupsListPage',
	component: GroupsListPage,
} as Meta<typeof GroupsListPage>;

const Template: StoryFn<typeof GroupsListPage> = (args) => <GroupsListPage />;

export const Normal = Template.bind({});
