import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { UserCard } from '@/shared/ui/UserCard';
import { Text } from '@/shared/ui/Text';
import { getGroupPagePath } from '@/shared/const/router';
import { Group } from '../../model/types/groupSchema';

interface IGroupCardProps {
	group: Group;
}

export const GroupCard = memo((props: IGroupCardProps) => {
	const { group } = props;

	return (
		<Flex justify="space-between">
			<UserCard
				width="calc(100% - 170px)"
				avatarSize="l"
				id={group.id}
				name={group.name}
				avatar={group.avatar}
				additionalText={group.description}
				border
				href={getGroupPagePath(group.id)}
			/>
			<Text
				text={group.createdAt}
				theme="secondary-invert"
				width="170px"
				textAlign="right"
			/>
		</Flex>
	);
});
