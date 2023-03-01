const dateToMilliseconds = (date) => {
	return new Date(date.split('.').reverse().join('.')).getTime();
};

module.exports = dateToMilliseconds;
