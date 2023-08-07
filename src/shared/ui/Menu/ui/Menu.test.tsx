import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/test';
import { Menu } from './Menu';

describe('Menu', () => {
	test('Open / Close menu', async () => {
		await act(() =>
			componentTestRender(<Menu trigger="Trigger" children="Content" />),
		);

		const user = userEvent.setup();

		await user.click(screen.getByTestId('Menu.trigger'));

		expect(screen.getByTestId('Menu.content')).toHaveStyle(`display: flex`);

		await user.click(screen.getByTestId('Menu.trigger'));

		expect(screen.getByTestId('Menu.content')).toHaveStyle(`display: none`);
	});
});
