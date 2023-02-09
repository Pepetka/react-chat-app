export type { UserSchema } from './model/types/UserSchema';
export { userReducer, userActions } from './model/Slice/userSlice';
export {
	getUserState,
	getUserAuthData,
	getUserInited,
} from './model/selectors/userSelectors';
