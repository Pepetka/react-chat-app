import { Meta, StoryFn } from '@storybook/react';
import { AppImg } from './AppImg';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'shared/AppImg',
	component: AppImg,
} as Meta<typeof AppImg>;

const Template: StoryFn<typeof AppImg> = (args) => <AppImg {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	alt: 'Image',
	src: image,
	width: '200px',
};
