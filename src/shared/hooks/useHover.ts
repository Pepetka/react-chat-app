import { useCallback, useState } from 'react';

interface IUseHoverProps {
	/**
	 * Флаг, отвечающий за начальное значение hover
	 */
	initialHover?: boolean;
}

interface IUseHoverReturn {
	/**
	 * Флаг, показывающий находится ли компонент под наведением
	 */
	hover: boolean;
	/**
	 * Функция, отслеживающая событие наведения курсора на компонент
	 */
	onMouseOver: () => void;
	/**
	 * Функция, отслеживающая событие выхода курсора за пределы компонента
	 */
	onMouseOut: () => void;
}

/**
 * Хук, возвращающий объект, описываемый типом IUseHoverReturn
 * @param props - аргументы, описываемые типом IUseHoverProps
 */
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
