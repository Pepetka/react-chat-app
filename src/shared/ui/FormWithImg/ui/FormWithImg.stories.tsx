import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import image from '@/shared/assets/images/image.jpg';
import { FormWithImg } from './FormWithImg';

export default {
	title: 'shared/FormWithImg',
	component: FormWithImg,
	decorators: [RouterDecorator()],
} as Meta<typeof FormWithImg>;

const Template: StoryFn<typeof FormWithImg> = (args) => (
	<FormWithImg {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	withImg: true,
	defaultImages: [image, image, image],
	textPlaceholder: 'Text placeholder',
};

export const WithImgArea = Template.bind({});
WithImgArea.args = {
	withImg: true,
	textPlaceholder: 'Text placeholder',
};

export const WithoutImgArea = Template.bind({});
WithoutImgArea.args = {
	textPlaceholder: 'Text placeholder',
};
