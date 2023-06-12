import { useContext } from "react"
import { authContext } from "./AuthProvider"
import { Navigate } from "react-router-dom";









export default function LoginRoute({children}) {

    const {user,loading} = useContext(authContext);

    

    if(!loading){

        if(user){
            return <Navigate to={'/'}/>
        }else{
            return children
        }

    }



    
}