import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { GroupCardSkeleton } from '../GroupCardSkeleton/GroupCardSkeleton';
import { GroupCard } from '../GroupCard/GroupCard';
import { Group, GroupsList } from '../../model/types/groupSchema';

interface IChatListProps {
	groups?: GroupsList;
	isLoading: boolean;
	isError: boolean;
	'data-testid'?: string;
}

const StyledHr = styled.div`
	width: 200px;
	height: 2px;
	background: var(--invert-secondary-color);
`;

const GroupListBlock = memo(
	(props: {
		blockTitle: string;
		groups: Array<Group>;
		'data-testid'?: string;
	}) => {
		const { blockTitle, groups, 'data-testid': dataTestId } = props;
		const { t } = useTranslation('group');

		if (!groups?.length) {
			return null;
		}

		return (
			<Flex
				data-testid={`${dataTestId}.group.${blockTitle}`}
				direction="column"
				gap="8"
			>
				<Flex direction="column">
					<Text text={t(blockTitle)} theme="primary-invert" size="xl" />
					<StyledHr />
				</Flex>
				{groups.map((group) => (
					<Flex key={group.id} direction="column">
						<GroupCard
							data-testid={`${dataTestId}.card.${group.id}`}
							group={group}
						/>
					</Flex>
				))}
			</Flex>
		);
	},
);

export const GroupList = memo((props: IChatListProps) => {
	const { groups, isError, isLoading, 'data-testid': dataTestId } = props;
	const { t } = useTranslation('group');

	if (isError && !isLoading) {
		return (
			<Flex data-testid={`${dataTestId}.error`} direction="column" gap="24">
				<Text
					text={t('Something went wrong')}
					theme="error"
					size="l"
					textAlign="center"
				/>
			</Flex>
		);
	}

	if (isLoading || !groups) {
		return (
			<Flex data-testid={`${dataTestId}.skeleton`} direction="column" gap="24">
				<Flex direction="column" gap="8">
					<Flex direction="column">
						<Skeleton height="32px" margin="4px" width="220px" />
						<StyledHr />
					</Flex>
					<GroupCardSkeleton />
					<GroupCardSkeleton />
					<GroupCardSkeleton />
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="24">
			{Object.entries(groups).map(([blockTitle, groups]) => (
				<GroupListBlock
					data-testid={dataTestId}
					key={blockTitle}
					blockTitle={blockTitle}
					groups={groups}
				/>
			))}
		</Flex>
	);
});
