import { Meta, StoryFn } from '@storybook/react';
import { Input } from './Input';

export default {
	title: 'shared/Input',
	component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Some text',
	width: '300px',
	label: 'Some label',
};

export const Inverted = Template.bind({});
Inverted.args = {
	children: 'Some text',
	width: '300px',
	label: 'Some label',
	theme: 'invert',
};
