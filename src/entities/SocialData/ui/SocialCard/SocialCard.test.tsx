import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { SocialCard } from './SocialCard';

describe('SocialCard', () => {
	test('Loading', async () => {
		await act(() =>
			componentTestRender(<SocialCard profileId="loadingId" userId="userId" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('SocialCard.skeleton')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(<SocialCard profileId="errorId" userId="userId" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('SocialCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SocialCard.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('SocialCard.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(<SocialCard profileId="userId" userId="userId" />),
		);

		await waitFor(() =>
			expect(screen.getByTestId('SocialCard.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SocialCard.skeleton'),
		);

		await waitFor(() => {
			expect(
				screen.getByTestId((id) =>
					id.startsWith('SocialCard.cards.Followers.number.title'),
				),
			).toHaveTextContent('3');
			expect(
				screen.getByTestId((id) =>
					id.startsWith('SocialCard.cards.Following.number.title'),
				),
			).toHaveTextContent('3');
			expect(
				screen.getByTestId((id) =>
					id.startsWith('SocialCard.cards.Groups.number.title'),
				),
			).toHaveTextContent('3');
			expect(
				screen.getAllByTestId((id) => id.startsWith('SocialCard.friends')),
			).toHaveLength(3);
		});
	});
});
