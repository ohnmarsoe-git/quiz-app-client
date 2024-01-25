import axios from '../api/config'
import useAuth from './useAuth'

const useRefreshToken = () => {

  const { loginDispatch } = useAuth();

  const refresh = async () => {

    const response = await axios.get('refresh', {
      withCredentials: true
    })

    if(response.status === 200) {
      //@ts-ignore
      loginDispatch({
        id: response.data?.user.id,
        firstName: response.data?.user.firstName,
        lastName: response.data?.user.lastName,
        email: response.data?.user.email,
        role: response.data?.user.role, 
        authToken: response.data?.accessToken
      })

      return response.data?.accessToken;
    }
  }

  return refresh;
}

export default useRefreshToken