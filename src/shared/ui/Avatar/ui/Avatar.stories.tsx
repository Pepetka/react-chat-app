import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { Avatar } from './Avatar';

export default {
	title: 'shared/Avatar',
	component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const CircleS = Template.bind({});
CircleS.args = {
	src: image,
	size: 's',
	circle: true,
};

export const CircleM = Template.bind({});
CircleM.args = {
	src: image,
	size: 'm',
	circle: true,
};

export const CircleL = Template.bind({});
CircleL.args = {
	src: image,
	size: 'l',
	circle: true,
};

export const CircleXL = Template.bind({});
CircleXL.args = {
	src: image,
	size: 'xl',
	circle: true,
};

export const CircleBorderPrimary = Template.bind({});
CircleBorderPrimary.args = {
	src: image,
	circle: true,
	border: true,
};

export const CircleBorderInvert = Template.bind({});
CircleBorderInvert.args = {
	src: image,
	circle: true,
	border: true,
	theme: 'invert',
};

export const SquareS = Template.bind({});
SquareS.args = {
	src: image,
	size: 's',
};

export const SquareM = Template.bind({});
SquareM.args = {
	src: image,
	size: 'm',
};

export const SquareL = Template.bind({});
SquareL.args = {
	src: image,
	size: 'l',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
	src: image,
	size: 'xl',
};

export const SquareBorderPrimary = Template.bind({});
SquareBorderPrimary.args = {
	src: image,
	border: true,
};

export const SquareBorderInvert = Template.bind({});
SquareBorderInvert.args = {
	src: image,
	border: true,
	theme: 'invert',
};
