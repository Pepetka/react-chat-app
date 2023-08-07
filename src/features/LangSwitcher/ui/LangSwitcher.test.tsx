import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { LangSwitcher } from './LangSwitcher';

describe('LangSwitcher', () => {
	test('Switch', async () => {
		await act(() => componentTestRender(<LangSwitcher />));

		const user = userEvent.setup();

		await waitFor(() =>
			expect(screen.getByTestId('LangSwitcher.en')).toBeInTheDocument(),
		);

		await user.click(screen.getByTestId('LangSwitcher.button'));

		await waitFor(() =>
			expect(screen.getByTestId('LangSwitcher.ru')).toBeInTheDocument(),
		);
	});
});
