import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { AppImg } from '@/shared/ui/AppImg';
import { Flex } from '@/shared/ui/Flex';
import { Carousel } from './Carousel';

export default {
	title: 'widgets/Carousel',
	component: Carousel,
	decorators: [
		(StoryComponent) => (
			<Flex justify="center">
				<StoryComponent />
			</Flex>
		),
	],
} as Meta<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args) => (
	<Carousel {...args}>
		<AppImg src={image} width="385px" height="385px" />
		<AppImg src={image} width="385px" height="385px" />
		<AppImg src={image} width="385px" height="385px" />
		<AppImg src={image} width="385px" height="385px" />
	</Carousel>
);

export const Normal = Template.bind({});
Normal.args = {
	carouselWidth: '385px',
	arrows: true,
};
