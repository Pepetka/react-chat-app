import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { BottomBar } from './BottomBar';

export default {
	title: 'widgets/BottomBar',
	component: BottomBar,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						height: 'auto',
						width: '100%',
						position: 'relative',
						top: '50dvh',
					}}
				>
					<StoryComponent />
				</div>
			);
		},
	],
} as Meta<typeof BottomBar>;

const Template: StoryFn<typeof BottomBar> = (args) => <BottomBar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
