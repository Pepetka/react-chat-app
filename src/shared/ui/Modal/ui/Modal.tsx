import { ReactNode, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Portal } from '@/shared/ui/Portal';
import { Overlay } from '@/shared/ui/Overlay';
import { useTheme } from '@/shared/hooks/useTheme';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';

interface IModalProps {
	/**
	 * Флаг, отвечающий за открытие модального окна
	 */
	isOpen: boolean;
	/**
	 * Содержимое модального окна
	 */
	children: ReactNode;
	/**
	 * Функция, вызываемая при закрытии модального окна
	 */
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
  0% { transform: scale(0.5, 0.5)}
  100% { transform: scale(1, 1)}
`;

const ScaleOutAnimation = keyframes`  
  0% { transform: scale(1, 1)}
  100% { transform: scale(0.5, 0.5)}
`;

const StyledContent = styled.div<{ opened: boolean }>`
	min-width: min(90%, 500px);
	z-index: var(--modal-z);
	animation-name: ${(props) =>
		props.opened ? ScaleInAnimation : ScaleOutAnimation};
	animation-duration: ${(props) => (props.opened ? '0.3s' : '0.1s')};
	animation-timing-function: linear;
`;

const StyledWrapper = styled.div<{ opened: boolean }>`
	animation-name: ${(props) =>
		props.opened ? FadeInAnimation : FadeOutAnimation};
	animation-duration: ${(props) => (props.opened ? '0.35s' : '0.15s')};
	animation-timing-function: linear;
`;

const StyledContentWrapper = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Modal = (props: IModalProps) => {
	const { isOpen, children, onCloseModal } = props;
	const [opened, setOpened] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		const body = document.querySelector('body')!;

		if (isOpen) {
			setOpened(true);
			body.style.overflow = 'hidden';
		} else {
			setTimeout(() => {
				setOpened(false);
				body.style.overflow = 'initial';
			}, 100);
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
			<StyledWrapper data-testid="Modal" opened={isOpen} className={theme}>
				<Overlay data-testid="Modal.overlay" onClick={onCloseModal} />
				<StyledContentWrapper>
					<StyledContent data-testid="Modal.content" opened={isOpen}>
						{children}
					</StyledContent>
				</StyledContentWrapper>
			</StyledWrapper>
		</Portal>
	);
};
