import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { componentTestRender } from '@/shared/config/test';
import { Button } from '@/shared/ui/Button';
import { Modal } from './Modal';

const TestComponent = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<Modal isOpen={isOpen}>Some Children</Modal>
			<Button data-testid="Modal.button" onClick={onClick}>
				Click
			</Button>
		</>
	);
};

describe('Modal', () => {
	test('Open / Close modal', async () => {
		await act(() => componentTestRender(<TestComponent />));

		expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();

		const user = userEvent.setup();

		await user.click(screen.getByTestId('Modal.button'));

		await waitFor(() =>
			expect(screen.getByTestId('Modal')).toBeInTheDocument(),
		);

		await user.click(screen.getByTestId('Modal.button'));

		await waitFor(() =>
			expect(screen.queryByTestId('Modal')).not.toBeInTheDocument(),
		);
	});

	test('Open modal / Close by overlay', async () => {
		await act(() => componentTestRender(<TestComponent />));

		expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();

		const user = userEvent.setup();

		await user.click(screen.getByTestId('Modal.button'));

		await waitFor(() =>
			expect(screen.getByTestId('Modal')).toBeInTheDocument(),
		);

		await user.click(screen.getByTestId('Modal.overlay'));

		await waitFor(() =>
			expect(screen.queryByTestId('Modal')).not.toBeInTheDocument(),
		);
	});
});
