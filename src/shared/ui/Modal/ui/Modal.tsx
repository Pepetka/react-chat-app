import { ReactNode, useEffect, useState } from 'react';
import { Portal } from '@/shared/ui/Portal';
import { Overlay } from '@/shared/ui/Overlay';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '@/shared/hooks/useTheme';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';

interface IModalProps {
	isOpen: boolean;
	children: ReactNode;
	onCloseModal?: () => void;
}

const FadeInAnimation = keyframes`  
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const FadeOutAnimation = keyframes`  
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const ScaleInAnimation = keyframes`  
  0% { transform: scale(0.5, 0.5) translate(-75%, -75%) }
  100% { transform: scale(1, 1) translate(-50%, -50%) }
`;

const ScaleOutAnimation = keyframes`  
  0% { transform: scale(1, 1) translate(-50%, -50%) }
  100% { transform: scale(0.5, 0.5) translate(-75%, -75%) }
`;

const StyledContent = styled.div<{ opened: boolean }>`
	min-width: min(90%, 500px);
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: var(--modal-z);
	transform: translate(-50%, -50%);
	animation: ${(props) => (props.opened ? ScaleInAnimation : ScaleOutAnimation)}
		0.3s linear;
`;

const StyledWrapper = styled.div<{ opened: boolean }>`
	animation: ${(props) => (props.opened ? FadeInAnimation : FadeOutAnimation)}
		0.35s linear;
`;

export const Modal = (props: IModalProps) => {
	const { isOpen, children, onCloseModal } = props;
	const [opened, setOpened] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		if (isOpen) {
			setOpened(true);
		} else {
			setTimeout(() => {
				setOpened(false);
			}, 300);
		}
	}, [isOpen]);

	useKeyboardEvent({
		addCondition: isOpen,
		callback: onCloseModal,
	});

	if (!opened) {
		return null;
	}

	return (
		<Portal>
			<StyledWrapper opened={isOpen} className={theme}>
				<Overlay onClick={onCloseModal} />
				<StyledContent opened={isOpen}>{children}</StyledContent>
			</StyledWrapper>
		</Portal>
	);
};
