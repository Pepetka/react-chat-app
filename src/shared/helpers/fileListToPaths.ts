export const fileListToPaths = (fileList?: FileList | null) => {
	if (!fileList) return [];

	const paths = [];
	for (let i = 0; i < fileList.length; i++) {
		const file = fileList[i];
		const objectURL = window.URL.createObjectURL(file);
		paths.push(objectURL);
	}
	return paths;
};
