import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthActionEnum } from './authActions';
import authReducer, { AuthState, defaultAuthState } from './AuthReducer';

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  authToken: string;
};

export interface IAuthContext {
  authState: AuthState;
  loginDispatch: (props: UserData) => void;
  logoutDispatch: () => void;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

// const AuthContext = createContext( {} as AuthContextType)

const AuthContext = createContext<IAuthContext>({
  authState: defaultAuthState,
  loginDispatch: () => {},
  logoutDispatch: () => {},
  persist: false,
  setPersist: () => {}
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {
  const [authState, setAuthState] = useReducer(authReducer, defaultAuthState);

  //@ts-ignore
  const [ persist, setPersist ] = useState( JSON.parse(localStorage.getItem("persist")) || false)

  const navigate = useNavigate();

  useEffect(() => {
  
    if(authState?.authToken) {
      if (checkTokenExpiration(authState?.authToken)) {
        logoutDispatch();
        navigate('/login')
      }
    }
    // eslint-disable-next-line
  }, []);

  // check JWT token
  const checkTokenExpiration = (token: string) => {
    let decodedToken: any = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
  };

  const loginDispatch = useCallback(
    (props: UserData) => {
      const { id, firstName, lastName, email, role, authToken } =
        props;

        setAuthState({
          type: AuthActionEnum.LOG_IN,
          payload: {
            id,
            firstName,
            lastName,
            email,
            role,
            authToken
          }
        });
        navigate('/quiz');
    },
    [navigate]
  );

  const logoutDispatch = useCallback(
    () => {
      // const user = cookies.user;
        //@ts-ignore
      setAuthState({
        type: AuthActionEnum.LOG_OUT,
        payload: null
      });
      navigate('/login');
      
    },
    [navigate]
  );

  return (
    <AuthContext.Provider
      value={{ authState, loginDispatch, logoutDispatch, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
