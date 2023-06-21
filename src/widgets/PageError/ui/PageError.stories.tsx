import { Meta, StoryFn } from '@storybook/react';
import { PageError } from './PageError';

export default {
	title: 'widgets/PageError',
	component: PageError,
} as Meta<typeof PageError>;

const Template: StoryFn<typeof PageError> = (args) => <PageError />;

export const Normal = Template.bind({});
Normal.args = {};
