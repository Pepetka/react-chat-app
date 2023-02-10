import { memo } from 'react';
import { getProfilePagePath } from '@/shared/const/router';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { UserMini } from '@/shared/types/userCard';

type TextSizeType = 'm' | 'l' | 'xl';

interface IUserCardProps {
	user: UserMini;
	avatarSize?: 's' | 'm' | 'l' | 'xl';
	border?: boolean;
	theme?: 'primary' | 'invert';
	textSize?: TextSizeType;
	additionalText?: string;
	width?: string;
	href?: string;
}

const textObject: Record<TextSizeType, TextSizeType | 's'> = {
	m: 's',
	l: 'm',
	xl: 'l',
};

export const UserCard = memo((props: IUserCardProps) => {
	const {
		user,
		avatarSize,
		border,
		theme = 'invert',
		textSize = 'l',
		additionalText,
		width,
		href = getProfilePagePath(user.id),
	} = props;

	return (
		<AppLink key={user.id} href={href} width={width}>
			<Flex gap="8" align={additionalText ? 'flex-start' : 'center'}>
				<Avatar
					size={avatarSize}
					circle
					src={user.avatar}
					border={border}
					theme={theme}
				/>
				<Flex direction="column">
					<Text
						text={`${user.firstname} ${user.lastname}`}
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
