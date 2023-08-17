import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/test';
import { StateSchema } from '@/app/provider/Store';
import { EditProfileForm } from './EditProfileForm';

const initialState: DeepPartial<StateSchema> = {
	user: { _inited: true, authData: { id: 'userId' } },
};

describe('EditProfileForm', () => {
	test('Empty fields', async () => {
		await act(() =>
			componentTestRender(<EditProfileForm />, {
				initialState,
			}),
		);

		const user = userEvent.setup();

		await waitFor(() => {
			expect(screen.getByTestId('EditProfileForm.loading')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByTestId('EditProfileForm.form')).toBeInTheDocument();
		});

		const firstname = screen.getByTestId('EditProfileForm.input.firstname');

		await user.clear(screen.getByTestId('EditProfileForm.input.status'));
		await user.clear(firstname);
		await user.type(firstname, '[Enter]');

		await waitFor(() => {
			expect(screen.getByText('Firstname is required')).toBeInTheDocument();
		});
	});
});
