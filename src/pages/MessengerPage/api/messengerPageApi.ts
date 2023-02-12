import { rtkApi } from '@/shared/api/rtkApi';
import { Messages } from '@/entities/Message';
import { UserMini } from '@/shared/types/userCard';
import { getUserAuthData } from '@/entities/User';
import { StateSchema } from '@/app/provider/Store';

interface IMessengerPageApiProps {
	chatId: string;
	userId: string;
}

export const messengerPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchMessages: build.query<
			{ messages: Messages; friend: UserMini },
			IMessengerPageApiProps
		>({
			query: ({ chatId, userId }) => ({
				url: '/messages',
				params: {
					chatId,
					userId,
				},
			}),
			providesTags: (result) => ['messages'],
		}),
		sendMessage: build.mutation<
			string,
			IMessengerPageApiProps & { text: string; img?: Array<string> }
		>({
			query: ({ chatId, userId, text, img }) => ({
				url: '/messages',
				method: 'Post',
				body: {
					chatId,
					userId,
					text,
					img,
				},
			}),
			async onQueryStarted(
				{ chatId, userId, text, img },
				{ dispatch, queryFulfilled, getState },
			) {
				const authData = getUserAuthData(getState() as StateSchema);

				const patchResult = dispatch(
					messengerPageApi.util.updateQueryData(
						'fetchMessages',
						{ chatId, userId },
						(draft) => {
							const currentDate = new Date().toLocaleDateString();

							if (draft.messages.find(([date]) => date === currentDate)) {
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
								draft.messages.push([
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
								]);
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

export const { useFetchMessagesQuery, useSendMessageMutation } =
	messengerPageApi;
