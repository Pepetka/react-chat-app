import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { AppImg } from './AppImg';

export default {
	title: 'shared/AppImg',
	component: AppImg,
	decorators: [RouterDecorator()],
} as Meta<typeof AppImg>;

const Template: StoryFn<typeof AppImg> = (args) => <AppImg {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	alt: 'Image',
	src: image,
	width: '200px',
};

export const Error = Template.bind({});
Error.args = {
	alt: 'Image',
	src: '',
	width: '200px',
};
