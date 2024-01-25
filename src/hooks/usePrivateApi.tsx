import React, {useEffect} from 'react';
import axios from '../api/config';
import { axiosInstance } from '../api/config';
import { useLocation } from 'react-router-dom';
import useAuth from './useAuth'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const usePrivateApi = () => {

  const location = useLocation();

  const { authState, loginDispatch, logoutDispatch } = useAuth ();

  let token:any; let email:any;


  if (!location.pathname.includes('admin') && authState.isAuth)
    token = authState.authToken;

  useEffect(() => {

    const requestIntercept = axiosInstance.interceptors.request.use( (config: any) => {
      if(token) {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config
    }, (error: any) => {
      return Promise.reject(error);
    })
  
    const responseIntercept = axiosInstance.interceptors.response.use( 
      (response: any) => response,
      async(error : any) => {
        const prevRequest = error?.config;
        if(error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            
            const res = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true});
          
            const newAccessToken = res?.data?.accessToken;

            if(newAccessToken) {
              //@ts-ignore
              loginDispatch( prev => {
                return { ...prev, accessToken: newAccessToken }
              })
            
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axiosInstance(prevRequest);
            }
          } catch(error) {
            if(error) logoutDispatch();
          }
          return Promise.reject(error);
        }
        
        
      })

      return () => {
        axiosInstance.interceptors.request.eject(requestIntercept);
        axiosInstance.interceptors.response.eject(responseIntercept);
      }

  }, [authState])
  return axiosInstance;
}

export default usePrivateApi