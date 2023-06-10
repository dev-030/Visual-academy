import { useContext } from "react"
import { authContext } from "./AuthProvider"
import { Navigate } from "react-router-dom";








export default function CustomRoute({children}) {


    const {user,roleData,loading} = useContext(authContext);


    if(!loading){
        if(user &&  roleData?.data?.role ==  children.props.role || roleData?.data?.role == `${children.props.role}`){
            return children;
        }else{
            return <Navigate to={'/login'}/>
        }
    }  

   
}