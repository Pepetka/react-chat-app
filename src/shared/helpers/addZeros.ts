export const addZeros = (num: number) => {
	return num < 10 ? `0${num}` : num;
};
