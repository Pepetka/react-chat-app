export const timeToMinutes = (time: string) => {
	return +time.split(':')[0] * 60 + +time.split(':')[1];
};
