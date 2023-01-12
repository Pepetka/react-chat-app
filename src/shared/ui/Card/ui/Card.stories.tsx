import { Meta, StoryFn } from '@storybook/react';
import { Card } from './Card';

export default {
	title: 'shared/Card',
	component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	children: 'Some text',
	width: '100px',
	height: '150px',
};
