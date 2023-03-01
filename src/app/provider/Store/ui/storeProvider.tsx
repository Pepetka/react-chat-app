import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/provider/Store';
import { createReduxStore } from '../config/store';

interface IStoreProviderProps {
	children: ReactNode;
	initialState?: StateSchema;
	asyncReducers?: ReducersMapObject<StateSchema>;
}

export const StoreProvider = ({
	children,
	initialState,
	asyncReducers,
}: IStoreProviderProps) => {
	const store = createReduxStore(initialState, asyncReducers);

	return <Provider store={store}>{children}</Provider>;
};
