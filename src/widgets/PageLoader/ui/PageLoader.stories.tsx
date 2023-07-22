import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { PageLoader } from './PageLoader';

export default {
	title: 'widgets/PageLoader',
	component: PageLoader,
	decorators: [RouterDecorator()],
} as Meta<typeof PageLoader>;

const Template: StoryFn<typeof PageLoader> = (args) => <PageLoader />;

export const Normal = Template.bind({});
