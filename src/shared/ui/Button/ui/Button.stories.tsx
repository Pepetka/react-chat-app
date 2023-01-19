import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		theme: {
			options: ['primary', 'outline', 'clear'],
			control: { type: 'radio' },
		},
	},
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Button',
	width: '100px',
	height: '50px',
};

export const PrimaryInvert = Template.bind({});
PrimaryInvert.args = {
	children: 'Button',
	width: '100px',
	height: '50px',
	invert: true,
};

export const Outline = Template.bind({});
Outline.args = {
	children: 'Button',
	theme: 'outline',
	width: '100px',
	height: '50px',
};

export const OutlineInvert = Template.bind({});
OutlineInvert.args = {
	children: 'Button',
	theme: 'outline',
	width: '100px',
	height: '50px',
	invert: true,
};

export const Clear = Template.bind({});
Clear.args = {
	children: 'Button',
	theme: 'clear',
	width: '100px',
	height: '50px',
};

export const ClearInvert = Template.bind({});
ClearInvert.args = {
	children: 'Button',
	theme: 'clear',
	width: '100px',
	height: '50px',
	invert: true,
};
