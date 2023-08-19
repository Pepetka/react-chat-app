export const usePathParams = <T extends object>(
	template: string,
	path: string,
): T => {
	if (!template || !path) {
		return {} as T;
	}

	const regexPattern = new RegExp(
		`^${template.replace(/\//g, '\\/').replace(/:\w+/g, '([^\\/]+)')}\\/?$`,
	);
	const matches = path.match(regexPattern);

	if (!matches) {
		return {} as T;
	}

	const paramNames = template.match(/:\w+/g);
	const params: Record<string, string> = {};

	paramNames?.forEach((param, index) => {
		const paramName = param.slice(1);
		params[paramName] = matches[index + 1];
	});

	return params as T;
};
