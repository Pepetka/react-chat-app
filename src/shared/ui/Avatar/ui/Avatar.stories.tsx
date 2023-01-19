import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
	title: 'shared/Avatar',
	component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const CircleS = Template.bind({});
CircleS.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 's',
	circle: true,
};

export const CircleM = Template.bind({});
CircleM.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'm',
	circle: true,
};

export const CircleL = Template.bind({});
CircleL.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'l',
	circle: true,
};

export const CircleXL = Template.bind({});
CircleXL.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'xl',
	circle: true,
};

export const CircleBorderPrimary = Template.bind({});
CircleBorderPrimary.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	circle: true,
	border: true,
};

export const CircleBorderInvert = Template.bind({});
CircleBorderInvert.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	circle: true,
	border: true,
	theme: 'invert',
};

export const SquareS = Template.bind({});
SquareS.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 's',
};

export const SquareM = Template.bind({});
SquareM.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'm',
};

export const SquareL = Template.bind({});
SquareL.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'l',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	size: 'xl',
};

export const SquareBorderPrimary = Template.bind({});
SquareBorderPrimary.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	border: true,
};

export const SquareBorderInvert = Template.bind({});
SquareBorderInvert.args = {
	img: 'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
	border: true,
	theme: 'invert',
};
