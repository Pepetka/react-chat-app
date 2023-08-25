import { useCallback, useEffect, useRef } from 'react';

interface IUseThrottleProps<T> {
	/**
	 * Функция, вызываемая раз в промежуток времени
	 * @param props - пропсы callback функции
	 */
	callback: (props: T) => void;
	/**
	 * Значение промежутка в мс
	 */
	timeout?: number;
}

/**
 * Хук, возвращающий функцию, которая вызывает callback максимум раз в интервал времени timeout
 * @param props - аргументы, описываемые типом IUseThrottleProps
 */
export const useThrottle = <T extends object | undefined>(
	props: IUseThrottleProps<T>,
) => {
	const { callback, timeout = 1000 } = props;
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const withThrottle = useCallback(
		(props: T) => {
			if (timerRef.current) {
				return;
			}

			callback(props);
			timerRef.current = setTimeout(() => {
				if (timerRef.current) clearTimeout(timerRef.current);
				timerRef.current = null;
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

	return withThrottle;
};
