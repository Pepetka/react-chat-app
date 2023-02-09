import { Meta, StoryFn } from '@storybook/react';
import { CommentForm } from './CommentForm';

export default {
	title: 'entities/Comment/CommentForm',
	component: CommentForm,
} as Meta<typeof CommentForm>;

const Template: StoryFn<typeof CommentForm> = (args) => (
	<CommentForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
