import { Meta, StoryFn } from '@storybook/react';
import {
	RouterDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import NotFoundPage from './NotFoundPage';

export default {
	title: 'pages/NotFoundPage',
	component: NotFoundPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = (args) => <NotFoundPage />;

export const Normal = Template.bind({});
