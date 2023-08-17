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
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
	test('Empty fields', async () => {
		await act(() => componentTestRender(<RegisterForm />));

		fireEvent.submit(screen.getByTestId('RegisterForm.form'));

		await waitFor(() => {
			expect(screen.getByText('Username is required')).toBeInTheDocument();
			expect(screen.getByText('Password is required')).toBeInTheDocument();
			expect(screen.getByText('Age must be over 14')).toBeInTheDocument();
			expect(screen.getByText('Email is required')).toBeInTheDocument();
			expect(screen.getByText('Firstname is required')).toBeInTheDocument();
			expect(screen.getByText('Lastname is required')).toBeInTheDocument();
			expect(screen.getByText('Agree is required')).toBeInTheDocument();
		});
	});

	test('Loading', async () => {
		await act(() => componentTestRender(<RegisterForm />));

		const user = userEvent.setup();

		await user.type(
			screen.getByTestId('RegisterForm.input.username'),
			'infinite',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.password'),
			'password',
		);
		await user.type(screen.getByTestId('RegisterForm.input.age'), '25');
		await user.type(
			screen.getByTestId('RegisterForm.input.email'),
			'email@mail.ru',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.firstname'),
			'Firstname',
		);
		await user.click(screen.getByTestId('RegisterForm.input.agree'));
		await user.type(
			screen.getByTestId('RegisterForm.input.lastname'),
			'Lastname[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() => componentTestRender(<RegisterForm />));

		const user = userEvent.setup();

		await user.type(
			screen.getByTestId('RegisterForm.input.username'),
			'username',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.password'),
			'wrong password',
		);
		await user.type(screen.getByTestId('RegisterForm.input.age'), '25');
		await user.type(
			screen.getByTestId('RegisterForm.input.email'),
			'email@mail.ru',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.firstname'),
			'Firstname',
		);
		await user.click(screen.getByTestId('RegisterForm.input.agree'));
		await user.type(
			screen.getByTestId('RegisterForm.input.lastname'),
			'Lastname[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);

		await waitForElementToBeRemoved(() => screen.getByText('Loading'));

		await waitFor(() => {
			expect(
				screen.getByTestId('RegisterForm.error.server'),
			).toBeInTheDocument();
			expect(screen.getByText('Some test error')).toBeInTheDocument();
		});
	});

	test('Fulfilled', async () => {
		await act(() => componentTestRender(<RegisterForm />));

		const user = userEvent.setup();

		await user.type(
			screen.getByTestId('RegisterForm.input.username'),
			'username',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.password'),
			'password[Enter]',
		);
		await user.type(screen.getByTestId('RegisterForm.input.age'), '25');
		await user.type(
			screen.getByTestId('RegisterForm.input.email'),
			'email@mail.ru',
		);
		await user.type(
			screen.getByTestId('RegisterForm.input.firstname'),
			'Firstname',
		);
		await user.click(screen.getByTestId('RegisterForm.input.agree'));
		await user.type(
			screen.getByTestId('RegisterForm.input.lastname'),
			'Lastname[Enter]',
		);

		await waitFor(() =>
			expect(screen.getByText('Loading')).toBeInTheDocument(),
		);

		await waitForElementToBeRemoved(() => screen.getByText('Loading'));

		await waitFor(() =>
			expect(
				screen.queryByTestId('RegisterForm.error.server'),
			).not.toBeInTheDocument(),
		);
	});
});
