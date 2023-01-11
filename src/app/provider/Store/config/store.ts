import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '../types/StateSchema';
import { userReducer } from '@/entities/User';
import { authByUsernameReducer } from '@/features/AuthByUsername';
import { rtkApi } from '@/shared/api/rtkApi';

export const createReduxStore = () => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		user: userReducer,
		authByUsername: authByUsernameReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const store = configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(rtkApi.middleware),
	});

	return store;
};
