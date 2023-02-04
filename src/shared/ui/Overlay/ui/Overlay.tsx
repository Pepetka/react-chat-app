import { memo } from 'react';
import styled from 'styled-components';

interface IOverlayProps {
	onClick?: () => void;
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
	const { onClick } = props;

	return <StyledOverlay onClick={onClick} />;
});
