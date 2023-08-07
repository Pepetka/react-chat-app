import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
	test('Switch', async () => {
		await act(() => componentTestRender(<ThemeSwitcher />));

		const user = userEvent.setup();

		await waitFor(() =>
			expect(
				screen.getByTestId('ThemeSwitcher.light_theme'),
			).toBeInTheDocument(),
		);

		await user.click(screen.getByTestId('ThemeSwitcher.button'));

		await waitFor(() =>
			expect(
				screen.getByTestId('ThemeSwitcher.dark_theme'),
			).toBeInTheDocument(),
		);
	});
});
