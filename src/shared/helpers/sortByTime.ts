import { timeToMinutes } from './timeToMinutes';

export const sortByTime = (
	prev: string,
	current: string,
	direction: 'up' | 'dawn' = 'dawn',
) => {
	const prevMinutes = timeToMinutes(prev);
	const currentMinutes = timeToMinutes(current);

	const coefficient = direction === 'dawn' ? 1 : -1;

	return coefficient * (currentMinutes - prevMinutes);
};
