import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/config';
import AuthContext from '../context/authProvider';

const Logout = () => {
  const api: any = axios;

  const { authState, logoutDispatch } = useContext(AuthContext);

  const { authToken } = authState;

  const navigate = useNavigate();

  const requestHandle = (token: any) => {
    api
      .get(`/logout`, { withCredentials: true })
      .then((res: any) => {
        if (res.status === 200 || res.status === 204) {
          delete api.defaults.headers.common['Authorization'];
          logoutDispatch();
          localStorage.removeItem('persist');
          return navigate('/login');
        }
      })
      .catch((error: any) => {
        if (error.response) {
          logoutDispatch();
          return navigate('/login');
        }
      });
  };

  const handleLogout = async () => {
    requestHandle(authToken);
  };

  return (
    <>
      <button
        onClick={() => handleLogout()}
        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
        role="menuitem"
        tabIndex={-1}
        id="menu-item-3"
      >
        Sign Out
      </button>
    </>
  );
};

export default Logout;
