import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Card } from './Card';

export default {
	title: 'shared/Card',
	component: Card,
	decorators: [RouterDecorator()],
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const WithBorder = Template.bind({});
WithBorder.args = {
	children: 'Some text',
	width: '150px',
	height: '200px',
	border: true,
};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
	children: 'Some text',
	width: '150px',
	height: '200px',
};

export const WithCorner = Template.bind({});
WithCorner.args = {
	children: 'Some text',
	width: '150px',
	height: '200px',
	borderRadius: false,
};
