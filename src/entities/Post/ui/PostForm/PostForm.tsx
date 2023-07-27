import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { DynamicModuleLoader } from '@/shared/components';
import { Card } from '@/shared/ui/Card';
import { UserMini } from '@/shared/types/userCard';
import { postReducer } from '../../model/slice/postSlice';
import { useAddPostMutation } from '../../api/postApi';

interface IPostFormProps {
	userId: string;
	profileId: string;
	authorData?: UserMini;
}

export const PostForm = memo((props: IPostFormProps) => {
	const { userId, profileId, authorData } = props;
	const [onAddPost, { isLoading, isSuccess }] = useAddPostMutation();
	const { t } = useTranslation('profile');

	const onSubmit = useCallback(
		(data: { text?: string; files?: FileList }) => {
			if (data.text || data.files) {
				onAddPost({ ...data, authorId: userId, profileId, authorData });
			}
		},
		[authorData, onAddPost, profileId, userId],
	);

	return (
		<DynamicModuleLoader reducerKey="post" reducer={postReducer}>
			<Card width="100%">
				<FormWithImg
					withImg={true}
					textPlaceholder={t('Share your news')}
					isLoading={isLoading}
					isSuccess={isSuccess}
					onSubmit={onSubmit}
				/>
			</Card>
		</DynamicModuleLoader>
	);
});
