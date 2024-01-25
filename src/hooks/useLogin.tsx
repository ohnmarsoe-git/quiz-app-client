import { useState, useContext } from 'react';
import AuthContext from '../context/authProvider';
import axios from '../api/config';

const useLogin = () => {
  const api: any = axios;

  const { loginDispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [onerrors, setOnErrors] = useState({
    email: '',
    password: ''
  });

  const handleGoogle = (response: any) => {
    api
      .post(`/gglogin`, JSON.stringify({ credential: response.credential }))
      .then((res: any) => {
        if (res.status === 200) {
          loginDispatch({
            id: res.data.id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            role: res.data.role,
            authToken: res.data.accessToken
          });
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setOnErrors(error.response.data.errors);
      });
  };

  const handleGithub = (code: string) => {
    try {
      api
        .post(`/gitlogin`, { code: code })
        .then((res: any) => {
          if (res.status === 200) {
            loginDispatch({
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
              role: 'user',
              authToken: res.data.accessToken
            });
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setOnErrors(error.response.data.errors);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data: any) => {
    try {
      api
        .post(`/auth`, data)
        .then((res: any) => {
          if (res.status === 200) {
            if(res.data?.user.role === 'user') {
              loginDispatch({
                id: res.data?.user.id,
                firstName: res.data?.user.firstName,
                lastName: res.data?.user.lastName,
                email: res.data?.user.email,
                role: res.data?.user.role,
                authToken: res.data.accessToken
              });
            } else {
              setOnErrors({
                email: 'This mail and password does not have account!',
                password: ''
              });
            }
          }
        })
        .catch((error: any) => {
          setOnErrors(error.response.data.errors);
        });
    } catch (err: any) {
      console.log(err);
      setOnErrors(err.response.data);
    }
  };

  return {
    loading,
    onerrors,
    onSubmit,
    handleGoogle,
    handleGithub
  };
};

export default useLogin;
