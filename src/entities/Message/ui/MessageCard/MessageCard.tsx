import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Carousel } from '@/widgets/Carousel';
import { AppImg } from '@/shared/ui/AppImg';
import { Modal } from '@/shared/ui/Modal';
import { Message } from '../../model/types/messageSchema';

interface IMessageCardProps {
	admin: boolean;
	message: Message;
}

export const MessageCard = memo((props: IMessageCardProps) => {
	const { message, admin } = props;
	const { t } = useTranslation('chats');
	const [isOpen, setIsOpen] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<Card padding="10px" width="300px" invert={admin} border={!admin}>
			<Flex direction="column" gap="4">
				<Text
					text={message.name}
					theme={`primary${!admin ? '-invert' : ''}`}
					size="l"
					textAlign={admin ? 'right' : 'left'}
				/>
				{message?.img && (
					<>
						<Carousel carouselWidth="100%" carouselHeight="250px">
							{message.img.map((src, index) => (
								<Flex key={index} height="250px" align="center">
									<AppImg
										src={src}
										width="100%"
										height="auto"
										onClick={onOpenModal}
									/>
								</Flex>
							))}
						</Carousel>
						<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
							<Carousel carouselWidth="700px" carouselHeight="700px">
								{message.img.map((src, index) => (
									<Flex key={index} height="700px" align="center">
										<AppImg
											width="700px"
											src={src}
											alt={t('Message image')}
											errorFallback={
												<Text
													text={t('Something went wrong')}
													size="l"
													textAlign="center"
												/>
											}
										/>
									</Flex>
								))}
							</Carousel>
						</Modal>
					</>
				)}
				{message?.text && (
					<Text
						text={message.text}
						theme={`secondary${!admin ? '-invert' : ''}`}
						textAlign={admin ? 'right' : 'left'}
					/>
				)}
				<Text
					text={message.time}
					theme={`secondary${!admin ? '-invert' : ''}`}
					textAlign={admin ? 'right' : 'left'}
				/>
			</Flex>
		</Card>
	);
});
