import { StateSchema } from '@/app/provider/Store';

export const getPostState = (state: StateSchema) =>
	state.post ?? { text: '', img: '' };
