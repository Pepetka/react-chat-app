import { useCallback, useEffect, useRef } from 'react';

interface IUseDebounceProps<T> {
	/**
	 * Функция, вызываемая с задержкой
	 * @param props - пропсы callback функции
	 */
	callback: (props: T) => void;
	/**
	 * Значение задержки в мс
	 */
	timeout?: number;
}

/**
 * Хук, возвращающий функцию, которая вызывает callback с задержкой timeout мс после последнего вызова
 * @param props - аргументы, описываемые типом IUseDebounceProps
 */
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
