import { useContext, useEffect, useState } from 'react'
import { authContext } from './authentication/AuthProvider'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';



function App() {
  const [count, setCount] = useState(0)

  const {user ,loading} = useContext(authContext);

 
  




  return (
    <>
     

    <h1>helllo</h1>

 

  

    
   
    </>
  )
}

export default App

