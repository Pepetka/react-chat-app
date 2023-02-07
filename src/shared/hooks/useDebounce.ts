import { useCallback, useEffect, useRef } from 'react';

interface IUseDebounceProps<T> {
	callback: (prop: T) => void;
	timeout?: number;
}

export const useDebounce = <T extends string | undefined>(
	props: IUseDebounceProps<T>,
) => {
	const { callback, timeout = 1000 } = props;
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const withDebounce = useCallback(
		(prop: T) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				callback(prop);
			}, timeout);
		},
		[callback, timeout],
	);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return withDebounce;
};
