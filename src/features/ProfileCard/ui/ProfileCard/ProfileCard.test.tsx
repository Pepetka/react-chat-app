import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import {
	mockServerSocket,
	resetMockSocket,
} from '@/shared/config/socket/socketMock';
import { ProfileCard } from './ProfileCard';

describe('ProfileCard', () => {
	beforeAll(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['id2']);
		});
	});

	afterAll(() => {
		resetMockSocket();
	});

	test('Loading', async () => {
		await act(() =>
			componentTestRender(<ProfileCard userId="id1" profileId="loadingId" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('ProfileCard.skeleton')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(<ProfileCard userId="id1" profileId="errorId" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('ProfileCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('ProfileCard.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('ProfileCard.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(<ProfileCard userId="id1" profileId="id2" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('ProfileCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('ProfileCard.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('ProfileCard.card')).toBeInTheDocument(),
		);
		await waitFor(() => expect(screen.getByText('online')).toBeInTheDocument());
	});
});
