import { memo } from 'react';
import styled from 'styled-components';

interface IOverlayProps {
	/**
	 * Функция, вызываемая при клике на компонент
	 */
	onClick?: () => void;
	/**
	 * Id для тестирования
	 */
	'data-testid'?: string;
}

const StyledOverlay = styled.div`
	background: var(--overlay-color);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: var(--overlay-z);
`;

export const Overlay = memo((props: IOverlayProps) => {
	const { onClick, 'data-testid': dataTestId } = props;

	return <StyledOverlay data-testid={dataTestId} onClick={onClick} />;
});
