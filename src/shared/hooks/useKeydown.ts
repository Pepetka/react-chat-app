import { useCallback, useEffect } from 'react';

interface IUseKeydownProps {
	callback?: () => void;
	addCondition?: boolean;
}

export const useKeydown = (props: IUseKeydownProps = {}) => {
	const { callback, addCondition = true } = props;

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && addCondition) {
				callback?.();
			}
		},
		[addCondition, callback],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);
};
