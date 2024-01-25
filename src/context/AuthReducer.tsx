import { Reducer } from 'react';
import { AuthAction } from './authActions';

export interface AuthState {
  isAuth?: boolean;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  authToken?: string
}

export const defaultAuthState: AuthState = {
  isAuth: false
};

const AuthReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  if (action.type === 'LOG_IN') {
    return {
      ...state,
      isAuth: true,
      id: action.payload.id,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      role: action.payload.role,
      authToken: action.payload.authToken
    };
  }

  if (action.type === 'LOG_OUT') {
    localStorage.removeItem('persist');
    return {
      ...state,
      isAuth: false,
      email: '',
      role: '',
      authToken: ''
    };
  }

  return defaultAuthState;
};

export default AuthReducer;
