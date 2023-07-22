import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { PageError } from './PageError';

export default {
	title: 'widgets/PageError',
	component: PageError,
	decorators: [RouterDecorator()],
} as Meta<typeof PageError>;

const Template: StoryFn<typeof PageError> = (args) => <PageError />;

export const Normal = Template.bind({});
Normal.args = {};
