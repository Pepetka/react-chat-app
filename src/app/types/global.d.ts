declare module '*.svg' {
	import React from 'react';

	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}
declare module '*.jpg';
declare module '*.png';

type DeepPartial<T> = T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

declare const __API__: string;
declare const __API_SOCKET__: string;
declare const __MOCK_SOCKET__: boolean;

interface ImportMeta {
	env: {
		DEV: boolean;
	};
}
