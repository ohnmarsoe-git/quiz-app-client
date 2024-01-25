import axios from '../api/config'
import useAuth from './useAuth'

const useRefreshToken = () => {

  const { authState, loginDispatch } = useAuth();

  const refresh = async () => {

    const response = await axios.get('refresh', {
      withCredentials: true
    })

    if(response.status === 200) {
      //@ts-ignore
      loginDispatch({
        id: authState?.id || '',
        firstName: authState?.firstName || '',
        lastName: authState?.lastName || '' ,
        email: authState?.email || '',
        role: authState?.role || '', 
        authToken: response.data?.accessToken
      })
      
      //@ts-ignore
      // loginDispatch( (prev) => {
      //   return { ...prev, accessToken: response.data?.accessToken }
      // })

      return response.data?.accessToken;
    }
  }

  return refresh;
}

export default useRefreshToken