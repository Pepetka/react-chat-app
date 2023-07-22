import { StoryFn } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const RouterDecorator =
	(initialEntries = '/', template = '') =>
	(StoryComponent: StoryFn) =>
		(
			<MemoryRouter initialEntries={[initialEntries]}>
				<Routes>
					<Route
						path={template || initialEntries}
						element={<StoryComponent />}
					/>
				</Routes>
			</MemoryRouter>
		);
