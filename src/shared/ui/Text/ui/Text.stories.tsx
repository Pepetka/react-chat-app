import { Meta, StoryFn } from '@storybook/react';
import { Text } from './Text';

export default {
	title: 'shared/Text',
	component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'Some Title',
	text: 'Some Text',
};

export const Invert = Template.bind({});
Invert.args = {
	title: 'Some Title',
	text: 'Some Text',
	theme: 'invert',
};

export const Error = Template.bind({});
Error.args = {
	title: 'Some Title',
	text: 'Some Text',
	theme: 'error',
};

export const Center = Template.bind({});
Center.args = {
	title: 'Some Title',
	text: 'Some Text',
	titleAlign: 'center',
	textAlign: 'center',
};

export const Right = Template.bind({});
Right.args = {
	title: 'Some Title',
	text: 'Some Text',
	titleAlign: 'right',
	textAlign: 'right',
};

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'Some Title',
	text: 'Some Text',
	size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Some Title',
	text: 'Some Text',
	size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
	title: 'Some Title',
	text: 'Some Text',
	size: 'xl',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
	title: 'Some Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'Some Text',
};
