import { StateSchema } from '@/app/provider/Store';

export const getCommentState = (state: StateSchema) =>
	state.comment ?? { text: '' };
