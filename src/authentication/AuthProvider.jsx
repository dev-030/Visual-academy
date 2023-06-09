import { createContext, useEffect, useState } from "react"

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from "./firebase.config";
import axios from "axios";
import useAxiosSecure from "../useAxiosSecure";







export const authContext = createContext(null);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const userRegister = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
}
const userLogin = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
}
const googleLogin = () => {
    return signInWithPopup(auth,googleProvider);
}
const userLogout = () => {
    return signOut(auth);
}



export default function AuthProvider({children}){

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure();
    const [ roleData, setRoleData] = useState();



    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth , (user) => {
            setUser(user)
            setLoading(false)
            axiosSecure.get(`/users/check/${user?.email}`).then(data => setRoleData(data))

            if(user){
                axios.post(`${axiosSecure.defaults.baseURL}jwt` , {email:user.email}).then((data) => {
                    localStorage.setItem('access-token',data.data.token)
                })
            }
        })

        return() => {unsubscribe()}
    },[])



    const data = {
        user,
        loading,
        userRegister,
        userLogin,
        googleLogin,
        userLogout,
        roleData

    }
    return( 
        <authContext.Provider value={data}>
            {children}
        </authContext.Provider>
    )
}