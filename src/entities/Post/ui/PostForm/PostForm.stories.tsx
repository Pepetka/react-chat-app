import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { PostForm } from './PostForm';

export default {
	title: 'entities/Post/PostForm',
	component: PostForm,
	decorators: [RouterDecorator()],
} as Meta<typeof PostForm>;

const Template: StoryFn<typeof PostForm> = (args) => <PostForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
