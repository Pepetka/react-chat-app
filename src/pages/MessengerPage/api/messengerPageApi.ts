import { StateSchema } from '@/app/provider/Store';
import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';
import { Online } from '@/shared/types/online';
import { Messages } from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';

interface IMessengerPageApiProps {
	chatId: string;
	userId: string;
	friendId: string;
}

export const messengerPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchMessages: build.query<
			{ messages: Messages; friend: UserMini },
			IMessengerPageApiProps
		>({
			query: ({ chatId, userId, friendId }) => ({
				url: '/messages',
				params: {
					chatId,
					userId,
					friendId,
				},
			}),
			providesTags: (result) => ['messages'],
		}),
		fetchOnline: build.query<Online, { userId: string }>({
			query: ({ userId }) => ({
				url: '/online',
				params: {
					userId,
				},
			}),
		}),
		sendMessage: build.mutation<
			string,
			IMessengerPageApiProps & { text: string; img?: Array<string> }
		>({
			query: ({ chatId, userId, text, img, friendId }) => ({
				url: '/messages',
				method: 'Post',
				body: {
					chatId,
					userId,
					text,
					img,
					friendId,
				},
			}),
			async onQueryStarted(
				{ chatId, userId, text, img, friendId },
				{ dispatch, queryFulfilled, getState },
			) {
				const authData = getUserAuthData(getState() as StateSchema);

				const patchResult = dispatch(
					messengerPageApi.util.updateQueryData(
						'fetchMessages',
						{ chatId, userId, friendId },
						(draft) => {
							const currentDate = new Date().toLocaleDateString();

							if (draft.messages?.find(([date]) => date === currentDate)) {
								const index = draft.messages.findIndex(
									([date]) => date === currentDate,
								);
								draft.messages[index][1].push({
									authorId: userId,
									name: `${authData!.firstname} ${authData!.lastname}`,
									text,
									img,
									time: `${new Date().getHours()}:${new Date().getMinutes()}`,
								});
							} else {
								draft.messages = [
									...(draft.messages ? draft.messages : []),
									[
										currentDate,
										[
											{
												authorId: userId,
												name: `${authData!.firstname} ${authData!.lastname}`,
												text,
												img,
												time: `${new Date().getHours()}:${new Date().getMinutes()}`,
											},
										],
									],
								];
							}
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['messages'],
		}),
	}),
});

export const {
	useFetchMessagesQuery,
	useSendMessageMutation,
	useFetchOnlineQuery,
} = messengerPageApi;
