import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

export const RouterDecorator =
	(initialEntries?: string) => (StoryComponent: StoryFn) =>
		(
			<MemoryRouter initialEntries={[initialEntries ?? '/']}>
				<StoryComponent />
			</MemoryRouter>
		);
