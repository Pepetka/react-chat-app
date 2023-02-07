import { StateSchema } from '@/app/provider/Store';

export const getFriendState = (state: StateSchema) => state.friend ?? {};
