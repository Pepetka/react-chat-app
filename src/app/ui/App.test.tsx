import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { App } from './App';
import { StateSchema } from '@/app/provider/Store';
import { componentTestRender } from '@/shared/config/test/componentTestRender/componentTestRender';

const initialState: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
	},
};

describe('App', () => {
	test('Be in the document', async () => {
		await act(() => {
			componentTestRender(<App />, { initialState });
		});

		expect(screen.getByTestId('App')).toBeInTheDocument();
		screen.debug();
	});
});
