import { useCallback, useEffect } from 'react';

interface IUseKeyboardEventProps {
	/**
	 * Функция, вызываемая при срабатывании события нажатия/отпускания определенной клавиши
	 * @param event - event, получаемый из обработчика событий
	 */
	callback?: (event: KeyboardEvent) => void;
	/**
	 * Дополнительное условие для вызова callback
	 */
	addCondition?: boolean;
	/**
	 * Событие, которое необходимо обрабатывать
	 */
	event?: 'keydown' | 'keyup';
	/**
	 * Клавиша, нажатие/отпускание которой нужно обрабатывать
	 */
	key?: string;
}

/**
 * Хук, отслеживающий событие нажатия/отпускания определенной клавиши
 * @param props - аргументы, описываемые типом IUseKeyboardEventProps
 */
export const useKeyboardEvent = (props: IUseKeyboardEventProps = {}) => {
	const {
		callback,
		addCondition = true,
		event = 'keydown',
		key = 'Escape',
	} = props;

	const onEvent = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === key && addCondition) {
				callback?.(event);
			}
		},
		[addCondition, callback, key],
	);

	useEffect(() => {
		window.addEventListener(event, onEvent);

		return () => {
			window.removeEventListener(event, onEvent);
		};
	}, [event, onEvent]);
};
