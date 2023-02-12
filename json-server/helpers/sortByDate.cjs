const dateToMilliseconds = require('./dateToMilliseconds.cjs');

const sortByDate = (prev, current, direction = 'dawn') => {
	const prevDate = dateToMilliseconds(prev);
	const currentDate = dateToMilliseconds(current);

	const coefficient = direction === 'dawn' ? 1 : -1;

	return coefficient * (currentDate - prevDate);
};

module.exports = sortByDate;
