import { createContext, useEffect, useState } from "react"

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from "./firebase.config";



export const authContext = createContext(null);

const auth = getAuth(app)

const userRegister = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
}
const userLogin = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
}
const googleLogin = () => {
    return signInWithPopup(auth);
}
const userLogout = () => {
    return signOut(auth);
}


export default function AuthProvider({children}){

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth , (user) => {
            setUser(user)
            setLoading(false)
        })

        return() => {unsubscribe()}
    },[])



    const data = {
        user,
        loading,
        userRegister,
        userLogin,
        googleLogin,
        userLogout

    }
    return( 
        <authContext.Provider value={data}>
            {children}
        </authContext.Provider>
    )
}