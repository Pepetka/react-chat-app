import { useCallback, useState } from 'react';

interface IUseHoverReturn {
	hover: boolean;
	onMouseOver: () => void;
	onMouseOut: () => void;
}

export const useHover = (): IUseHoverReturn => {
	const [hover, setHover] = useState(false);

	const onMouseOver = useCallback(() => {
		setHover(true);
	}, []);

	const onMouseOut = useCallback(() => {
		setHover(false);
	}, []);

	return {
		hover,
		onMouseOver,
		onMouseOut,
	};
};
