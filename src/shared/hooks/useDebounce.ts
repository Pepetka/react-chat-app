import { useCallback, useEffect, useRef } from 'react';

interface IUseDebounceProps<T> {
	callback: (props: T) => void;
	timeout?: number;
}

export const useDebounce = <T extends object | undefined>(
	props: IUseDebounceProps<T>,
) => {
	const { callback, timeout = 1000 } = props;
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const withDebounce = useCallback(
		(props: T) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				callback(props);
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
