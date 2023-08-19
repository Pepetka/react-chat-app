import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/test';
import { getEditGroupPagePath } from '@/shared/const/router';
import { EditGroupForm } from './EditGroupForm';

describe('EditGroupForm', () => {
	test('Empty fields', async () => {
		await act(() =>
			componentTestRender(<EditGroupForm />, {
				route: getEditGroupPagePath('groupId'),
			}),
		);

		const user = userEvent.setup();

		await waitFor(() => {
			expect(screen.getByTestId('EditGroupForm.loading')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByTestId('EditGroupForm.form')).toBeInTheDocument();
		});

		const name = screen.getByTestId('EditGroupForm.input.name');

		await user.clear(screen.getByTestId('EditGroupForm.input.description'));
		await user.clear(name);
		await user.type(name, '[Enter]');

		await waitFor(() => {
			expect(screen.getByText('Name is required')).toBeInTheDocument();
		});
	});
});
