import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { StateSchema, StoreProvider } from '@/app/provider/Store';
import { MemoryRouter } from 'react-router-dom';
import { DeepPartial } from 'redux';

const state: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			age: 22,
			avatar: '',
			createdAt: '',
			email: '',
			firstname: '',
			id: 'userId',
			lastname: '',
			username: '',
		},
	},
};

describe('App', () => {
	test('Be in the document', async () => {
		await act(() => {
			render(
				<MemoryRouter initialEntries={['/']}>
					<StoreProvider initialState={state as StateSchema}>
						<App />
					</StoreProvider>
				</MemoryRouter>,
			);
		});

		expect(screen.getByTestId('App')).toBeInTheDocument();
		screen.debug();
	});
});
