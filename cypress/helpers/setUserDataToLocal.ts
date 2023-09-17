import {
	LOCAL_STORAGE_AUTH_ACCESS_KEY,
	LOCAL_STORAGE_USER_KEY,
} from '../../src/shared/const/localstorage';
import { User } from '../../src/shared/types/userCard';

export const setUserDataToLocal = (body: User) => {
	window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
	window.localStorage.removeItem(LOCAL_STORAGE_AUTH_ACCESS_KEY);

	window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(body));
	window.localStorage.setItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
		body.accessToken ?? '',
	);

	return body;
};
