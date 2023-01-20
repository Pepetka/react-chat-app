import { Meta, StoryFn } from '@storybook/react';
import { PageLoader } from './PageLoader';

export default {
	title: 'widgets/PageLoader',
	component: PageLoader,
} as Meta<typeof PageLoader>;

const Template: StoryFn<typeof PageLoader> = (args) => <PageLoader />;

export const Normal = Template.bind({});
