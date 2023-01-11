import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/provider/Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
