import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';

describe('App', () => {
	test('Be in the document', () => {
		render(<App />);

		expect(screen.getByTestId('App')).toBeInTheDocument();
	});
});
