import { StateSchema } from '@/app/provider/Store';

export const getMessageState = (state: StateSchema) =>
	state.message ?? { text: '', images: '' };
