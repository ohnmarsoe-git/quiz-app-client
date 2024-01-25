import { useState } from 'react';
import axios from '../api/config';
import { useNavigate } from 'react-router-dom';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const useSignup = () => {
  const api: any = axios;

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Props>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errorshook, setErrorsHook] = useState({});

  const onSubmit = (data: any) => {
    try {
      api
        .post(`/register`, data)
        .then((res: any) => {
          if (res.status === 200) {
            navigate('/login');
          }

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
          });

        })
        .catch((error: any) => {
          setErrorsHook(error.response.data);
        });
    } catch (err: any) {
      setErrorsHook(err.response.data);
    }
  };

  return {
    formData,
    errorshook,
    onSubmit
  };
};

export default useSignup;
