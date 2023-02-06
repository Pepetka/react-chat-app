import { useCallback, useEffect } from 'react';

interface IUseKeyboardEventProps {
	callback?: (event: KeyboardEvent) => void;
	addCondition?: boolean;
	event?: 'keydown' | 'keyup';
	key?: string;
}

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
