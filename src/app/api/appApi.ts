import { rtkApi } from '@/shared/api/rtkApi';
import { getSocket } from '@/shared/api/socketApi';

interface IAppApiProps {
	userId: string;
}

export const appApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		initApp: build.mutation<void, IAppApiProps>({
			queryFn: async ({ userId }) => {
				const socket = getSocket();
				socket.connect();
				socket.emit('init', userId);

				return { data: undefined };
			},
		}),
		termApp: build.mutation<void, void>({
			queryFn: async () => {
				const socket = getSocket();
				socket.disconnect();

				return { data: undefined };
			},
		}),
	}),
});

export const { useInitAppMutation, useTermAppMutation } = appApi;
