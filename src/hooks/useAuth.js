import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/authProvider';

const useAuth = () => {
  const { authState } =  useContext(AuthContext)
  useDebugValue( authState, authState => authState?.email ? "Logged in" : "Logged Out");
  
  return useContext(AuthContext);
}

export default useAuth