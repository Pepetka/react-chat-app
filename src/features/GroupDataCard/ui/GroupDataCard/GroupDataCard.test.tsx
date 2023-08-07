import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { GroupDataCard } from './GroupDataCard';

describe('GroupDataCard', () => {
	test('Loading', async () => {
		await act(() => componentTestRender(<GroupDataCard groupId="loadingId" />));

		await waitFor(() =>
			expect(screen.getByTestId('GroupDataCard.skeleton')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() => componentTestRender(<GroupDataCard groupId="errorId" />));

		await waitFor(() =>
			expect(screen.getByTestId('GroupDataCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('GroupDataCard.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('GroupDataCard.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() => componentTestRender(<GroupDataCard groupId="Id2" />));

		await waitFor(() =>
			expect(screen.getByTestId('GroupDataCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('GroupDataCard.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('GroupDataCard.card')).toBeInTheDocument(),
		);
	});
});
