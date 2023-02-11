export const dateToMilliseconds = (date: string) => {
	return new Date(date.split('.').reverse().join('.')).getTime();
};
