import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/provider/Store';

interface DynamicModuleLoaderProps {
	/**
	 * Имя reducer, который необходимо подключить
	 */
	reducerKey: StateSchemaKey;
	/**
	 * Reducer, который необходимо подключить
	 */
	reducer: Reducer;
	/**
	 * Флаг, отвечающий за отключение reducer после размонтирования компонента
	 */
	removeOnUnmount?: boolean;
	/**
	 * Компонент, для работы которого необходимо подключить reducer
	 */
	children: ReactNode;
}

interface EffectProps {
	effect: () => void;
}

const Effect = ({ effect }: EffectProps) => {
	useEffect(() => effect(), [effect]);
	return null;
};

export const DynamicModuleLoader = ({
	children,
	reducer,
	reducerKey,
	removeOnUnmount = true,
}: DynamicModuleLoaderProps) => {
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	const callback = useCallback(() => {
		const activeReducers = store.reducerManager.getReducerMap();

		if (!activeReducers[reducerKey]) {
			store.reducerManager.add(reducerKey, reducer);
			dispatch({ type: `@INIT ${reducerKey} reducer` });
		}

		return () => {
			if (removeOnUnmount) {
				store.reducerManager.remove(reducerKey);
				dispatch({ type: `@DESTROY ${reducerKey} reducer` });
			}
		};
	}, [dispatch, reducer, reducerKey, removeOnUnmount, store.reducerManager]);

	return (
		<>
			<Effect effect={callback} />
			{children}
		</>
	);
};
