import { useContext } from "react"
import { authContext } from "./authentication/AuthProvider";




const useAuth = () => {
    const auth = useContext(authContext)
    return auth;

}

export default useAuth;