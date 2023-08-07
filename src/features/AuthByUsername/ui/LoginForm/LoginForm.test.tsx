import '@testing-library/jest-dom';
import {
	fireEvent,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
	test('Empty fields', async () => {
		await act(() => componentTestRender(<LoginForm />));

		fireEvent.submit(screen.getByTestId('LoginForm.form'));

		await waitFor(() => {
			expect(screen.getByText('Username is required')).toBeInTheDocument();
			expect(screen.getByText('Password is required')).toBeInTheDocument();
		});
	});

	test('Loading', async () => {
		await act(() => componentTestRender(<LoginForm />));

		const user = userEvent.setup();

		await user.type(screen.getByTestId('LoginForm.input.username'), 'infinite');
		await user.type(
			screen.getByTestId('LoginForm.input.password'),
			'password[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() => componentTestRender(<LoginForm />));

		const user = userEvent.setup();

		await user.type(screen.getByTestId('LoginForm.input.username'), 'username');
		await user.type(
			screen.getByTestId('LoginForm.input.password'),
			'wrong password[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);

		await waitForElementToBeRemoved(() => screen.getByText('Loading'));

		await waitFor(() => {
			expect(screen.getByTestId('LoginForm.error.server')).toBeInTheDocument();
			expect(screen.getByText('Some test error')).toBeInTheDocument();
		});
	});

	test('Fulfilled', async () => {
		await act(() => componentTestRender(<LoginForm />));

		const user = userEvent.setup();

		await user.type(screen.getByTestId('LoginForm.input.username'), 'username');
		await user.type(
			screen.getByTestId('LoginForm.input.password'),
			'password[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);

		await waitForElementToBeRemoved(() => screen.getByText('Loading'));

		await waitFor(() =>
			expect(
				screen.queryByTestId('LoginForm.error.server'),
			).not.toBeInTheDocument(),
		);
	});
});
