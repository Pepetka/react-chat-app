import { StoryFn } from '@storybook/react';
import '@/app/styles/index.css';

export const ThemeDecorator = (StoryComponent: StoryFn) => (
	<div className="App">
		<StoryComponent />
	</div>
);
