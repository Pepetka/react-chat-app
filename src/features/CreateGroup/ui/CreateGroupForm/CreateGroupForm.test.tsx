import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/test';
import { CreateGroupForm } from './CreateGroupForm';

describe('CreateGroupForm', () => {
	test('Empty fields', async () => {
		await act(() => componentTestRender(<CreateGroupForm />));

		const user = userEvent.setup();

		expect(screen.getByTestId('CreateGroupForm.form')).toBeInTheDocument();

		const name = screen.getByTestId('CreateGroupForm.input.name');

		await user.clear(screen.getByTestId('CreateGroupForm.input.description'));
		await user.clear(name);
		await user.type(name, '[Enter]');

		await waitFor(() => {
			expect(screen.getByText('Name is required')).toBeInTheDocument();
		});
	});
});
