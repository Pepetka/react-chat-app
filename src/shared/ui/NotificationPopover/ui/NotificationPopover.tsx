import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';

interface INotificationPopoverProps {
	/**
	 * Содержимое уведомления
	 */
	children: ReactNode;
	/**
	 * Содержимое уведомления
	 */
	notification?: string | number;
}

const StyledPopover = styled.div`
	position: relative;
`;

const StyledNotification = styled.div`
	font: var(--font-m);
	color: white;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(65%, -60%);
	min-width: 24px;
	height: 24px;
	width: auto;
	padding-inline: 4px;
	border-radius: 50%;
	background: var(--primary-error-color);
	z-index: var(--popup-z);
`;

export const NotificationPopover = memo((props: INotificationPopoverProps) => {
	const { children, notification } = props;

	return (
		<StyledPopover>
			{children}
			{notification && (
				<StyledNotification>
					<Flex height="100%" width="100%" justify="center" align="center">
						{notification}
					</Flex>
				</StyledNotification>
			)}
		</StyledPopover>
	);
});
