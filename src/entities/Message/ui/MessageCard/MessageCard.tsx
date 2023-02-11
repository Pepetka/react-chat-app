import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Carousel } from '@/widgets/Carousel';
import { AppImg } from '@/shared/ui/AppImg';
import { Message } from '../../model/types/messageSchema';

interface IMessageCardProps {
	admin: boolean;
	message: Message;
}

export const MessageCard = memo((props: IMessageCardProps) => {
	const { message, admin } = props;

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
					<Carousel carouselWidth="100%" carouselHeight="250px">
						{message.img.map((src, index) => (
							<Flex key={index} height="250px">
								<AppImg src={src} width="100%" />
							</Flex>
						))}
					</Carousel>
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
