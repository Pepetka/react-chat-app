import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
	/**
	 * Перемещаемый компонент
	 */
	children: ReactNode;
	/**
	 * Контейнер, в который перемещается компонент
	 */
	container?: HTMLElement;
}

export const Portal = (props: IPortalProps) => {
	const { children, container = document.body } = props;

	return createPortal(children, container);
};
