import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'shared/Avatar',
	component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const CircleS = Template.bind({});
CircleS.args = {
	img: image,
	size: 's',
	circle: true,
};

export const CircleM = Template.bind({});
CircleM.args = {
	img: image,
	size: 'm',
	circle: true,
};

export const CircleL = Template.bind({});
CircleL.args = {
	img: image,
	size: 'l',
	circle: true,
};

export const CircleXL = Template.bind({});
CircleXL.args = {
	img: image,
	size: 'xl',
	circle: true,
};

export const CircleBorderPrimary = Template.bind({});
CircleBorderPrimary.args = {
	img: image,
	circle: true,
	border: true,
};

export const CircleBorderInvert = Template.bind({});
CircleBorderInvert.args = {
	img: image,
	circle: true,
	border: true,
	theme: 'invert',
};

export const SquareS = Template.bind({});
SquareS.args = {
	img: image,
	size: 's',
};

export const SquareM = Template.bind({});
SquareM.args = {
	img: image,
	size: 'm',
};

export const SquareL = Template.bind({});
SquareL.args = {
	img: image,
	size: 'l',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
	img: image,
	size: 'xl',
};

export const SquareBorderPrimary = Template.bind({});
SquareBorderPrimary.args = {
	img: image,
	border: true,
};

export const SquareBorderInvert = Template.bind({});
SquareBorderInvert.args = {
	img: image,
	border: true,
	theme: 'invert',
};
