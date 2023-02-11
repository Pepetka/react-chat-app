import {
	CombinedState,
	configureStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema } from '../types/StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>,
) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
		...asyncReducers,
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(rtkApi.middleware),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};
