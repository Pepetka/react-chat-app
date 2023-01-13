import { Meta, StoryFn } from '@storybook/react';
import { Text } from './Text';

export default {
	title: 'shared/Text',
	component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Some Title',
	text: 'Some Text',
};

export const NormalCenter = Template.bind({});
NormalCenter.args = {
	title: 'Some Title',
	text: 'Some Text',
	titleAlign: 'center',
	textAlign: 'center',
};

export const NormalRight = Template.bind({});
NormalRight.args = {
	title: 'Some Title',
	text: 'Some Text',
	titleAlign: 'right',
	textAlign: 'right',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
	title: 'Some Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'Some Text',
};
