import { Meta, StoryFn } from '@storybook/react';
import { AppLink } from './AppLink';

export default {
	title: 'shared/AppLink',
	component: AppLink,
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = (args) => <AppLink {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	href: '/',
	children: <div>Some link</div>,
};
