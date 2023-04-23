import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Modal } from '@/shared/ui/Modal';
import { AppImg } from '@/shared/ui/AppImg';
import { GroupDataCardSkeleton } from '../GroupDataCardSkeleton/GroupDataCardSkeleton';
import { useFetchGroupDataQuery } from '../../api/groupCardApi';

interface IGroupDataCardProps {
	groupId: string;
}

export const GroupDataCard = memo((props: IGroupDataCardProps) => {
	const { groupId } = props;
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });
	const { t } = useTranslation('group');
	const {
		data: groupData,
		isFetching,
		isError,
	} = useFetchGroupDataQuery({ groupId }, { refetchOnMountOrArgChange: true });
	const [isOpen, setIsOpen] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	if (isFetching) {
		return <GroupDataCardSkeleton />;
	}

	if (isError) {
		return (
			<Card width="100%" height="400px" borderRadius={false}>
				<Flex height="100%" justify="center" align="center">
					<Text
						theme="error"
						title={t('Something went wrong')}
						TitleTag="p"
						titleAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Card width="100%" minHeight="400px" borderRadius={false}>
			<Flex
				wrap={isDesktopOrLaptop ? 'nowrap' : 'wrap'}
				height="100%"
				gap="8"
				justify="center"
			>
				<Flex direction="column" justify="space-between">
					<Flex direction="column" gap="8">
						<Text
							textAlign="left"
							theme="primary-invert"
							text={groupData?.[0]?.name}
							size="xl"
						/>
						<Text
							textAlign="left"
							theme="secondary-invert"
							text={`id:${groupData?.[0]?.id}`}
							size="m"
						/>
						<Text
							width={isSmallestScreen ? '100%' : '500px'}
							textAlign="left"
							theme="primary-invert"
							text={groupData?.[0]?.description}
							size="l"
						/>
					</Flex>
				</Flex>
				<Avatar
					src={groupData?.[0]?.avatar ?? ''}
					size="xl"
					onClick={onOpenModal}
				/>
				<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
					<AppImg
						width={isDesktopOrLaptop ? '700px' : '100vw'}
						height={isDesktopOrLaptop ? '700px' : '100vw'}
						src={groupData?.[0]?.avatar ?? ''}
						alt={t('Group Avatar')}
					/>
				</Modal>
			</Flex>
		</Card>
	);
});
