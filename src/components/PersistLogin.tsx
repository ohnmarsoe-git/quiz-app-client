import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistLogin =  () => {
  
  const [isLoading, setIsLoading] = useState(true)
  
  const refresh = useRefreshToken()

  const { authState, persist, logoutDispatch } = useAuth();

  //@ts-ignore
  useEffect( () => {
    
    let isMounted = true;
    
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch(err) {
        logoutDispatch()
      }
      finally {
        isMounted && setIsLoading(false)
      }
    }

    !authState?.authToken && persist ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false;
    
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    // console.log(`aT: ${JSON.stringify(authAdminState?.authToken)}`)
  }, [isLoading])


  return (
    <>
    {!persist
        ? <Outlet />
        : isLoading
            ? <p>Loading...</p>
            : <Outlet />
    }
    </>
  )
}

export default PersistLogin