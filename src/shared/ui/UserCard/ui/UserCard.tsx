import { memo } from 'react';
import { getProfilePagePath } from '@/shared/const/router';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';

type TextSizeType = 'm' | 'l' | 'xl';

interface IUserCardProps {
	/**
	 * ID карточки
	 */
	id: string;
	/**
	 * Аватар
	 */
	avatar: string;
	/**
	 * Имя
	 */
	name: string;
	/**
	 * Размер аватара
	 */
	avatarSize?: 's' | 'm' | 'l';
	/**
	 * Флаг, отвечающий за наличие border
	 */
	border?: boolean;
	/**
	 * Тема компонента
	 */
	theme?: 'primary' | 'invert';
	/**
	 * Размер текста
	 */
	textSize?: TextSizeType;
	/**
	 * Дополнительный текст
	 */
	additionalText?: string;
	/**
	 * Ширина компонента
	 */
	width?: string;
	/**
	 * Эндпоинт, на который перейдет пользователь при клике на компонент
	 */
	href?: string;
	/**
	 * Id для тестирования
	 */
	'data-testid'?: string;
}

const textObject: Record<TextSizeType, TextSizeType | 's'> = {
	m: 'm',
	l: 'm',
	xl: 'l',
};

export const UserCard = memo((props: IUserCardProps) => {
	const {
		id,
		avatar,
		name,
		avatarSize,
		border,
		theme = 'invert',
		textSize = 'l',
		additionalText,
		width,
		href = getProfilePagePath(id),
		'data-testid': dataTestId,
	} = props;

	return (
		<AppLink to={href} key={id} width={width}>
			<Flex
				data-testid={dataTestId}
				gap="8"
				align={additionalText ? 'flex-start' : 'center'}
			>
				<Avatar
					size={avatarSize}
					circle
					src={avatar}
					border={border}
					theme={theme}
				/>
				<Flex direction="column">
					<Text
						text={name}
						theme={`primary${theme === 'invert' ? '-invert' : ''}`}
						size={textSize}
					/>
					{additionalText && (
						<Text
							nowrap
							text={additionalText}
							theme={`secondary${theme === 'invert' ? '-invert' : ''}`}
							size={textObject[textSize]}
						/>
					)}
				</Flex>
			</Flex>
		</AppLink>
	);
});
