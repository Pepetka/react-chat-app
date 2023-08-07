import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/test';
import { Popover } from './Popover';

describe('Popover', () => {
	test('Open / Close popover', async () => {
		await act(() =>
			componentTestRender(<Popover trigger="Trigger" children="Content" />),
		);

		const user = userEvent.setup();

		await user.hover(screen.getByTestId('Popover.trigger'));

		expect(screen.getByTestId('Popover.content')).toHaveStyle(`display: flex`);

		await user.unhover(screen.getByTestId('Popover.trigger'));

		expect(screen.getByTestId('Popover.content')).toHaveStyle(`display: none`);
	});
});
