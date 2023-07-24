import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { RegisterForm } from './RegisterForm';

export default {
	title: 'features/RegisterByUsername/RegisterForm',
	component: RegisterForm,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100%',
						height: '100%',
					}}
				>
					<StoryComponent />
				</div>
			);
		},
	],
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => <RegisterForm />;

export const Normal = Template.bind({});
