import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { AppLink } from './AppLink';

export default {
	title: 'shared/AppLink',
	component: AppLink,
	decorators: [RouterDecorator()],
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = (args) => <AppLink {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	to: '/',
	children: <div>Some link</div>,
};
