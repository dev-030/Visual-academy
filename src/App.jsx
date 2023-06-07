import { useContext, useEffect, useState } from 'react'
import { authContext } from './authentication/AuthProvider'



function App() {
  const [count, setCount] = useState(0)

  const {user} = useContext(authContext);

  console.log(user?.email)


  return (
    <>
     

    <h1>helllo</h1>


  

    
   
    </>
  )
}

export default App

