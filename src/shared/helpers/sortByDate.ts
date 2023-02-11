import { dateToMilliseconds } from './dateToMilliseconds';

export const sortByDate = (
	prev: string,
	current: string,
	direction: 'up' | 'dawn' = 'dawn',
) => {
	const prevDate = dateToMilliseconds(prev);
	const currentDate = dateToMilliseconds(current);

	const coefficient = direction === 'dawn' ? 1 : -1;

	return coefficient * (currentDate - prevDate);
};
