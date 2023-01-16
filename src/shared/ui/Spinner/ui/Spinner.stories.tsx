import { Meta, StoryFn } from '@storybook/react';
import { Spinner } from './Spinner';

export default {
	title: 'shared/Spinner',
	component: Spinner,
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	theme: 'primary',
};

export const Invert = Template.bind({});
Invert.args = {
	theme: 'invert',
};
