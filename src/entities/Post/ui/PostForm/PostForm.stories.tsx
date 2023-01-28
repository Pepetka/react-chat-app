import { Meta, StoryFn } from '@storybook/react';
import { PostForm } from './PostForm';

export default {
	title: 'entities/Post/PostForm',
	component: PostForm,
} as Meta<typeof PostForm>;

const Template: StoryFn<typeof PostForm> = (args) => <PostForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
