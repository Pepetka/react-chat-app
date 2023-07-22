import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Overlay } from './Overlay';

export default {
	title: 'shared/Overlay',
	component: Overlay,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						height: '300px',
						width: '100%',
						position: 'relative',
					}}
				>
					<StoryComponent />
				</div>
			);
		},
	],
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = (args) => <Overlay {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
