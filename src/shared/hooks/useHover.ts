import { useCallback, useState } from 'react';

interface IUseHoverProps {
	initialHover?: boolean;
}

interface IUseHoverReturn {
	hover: boolean;
	onMouseOver: () => void;
	onMouseOut: () => void;
}

export const useHover = (props: IUseHoverProps = {}): IUseHoverReturn => {
	const { initialHover = false } = props;
	const [hover, setHover] = useState(initialHover);

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
