import { useContext } from "react"
import { authContext } from "./AuthProvider"
import { Navigate } from "react-router-dom";


export default function PrivateRoute({children}) {

    const {user,loading} = useContext(authContext);

    if(!loading){
        if(user){
            return children;
        }else{
            return <Navigate to={'/login'}/>
        }
    }
    
}