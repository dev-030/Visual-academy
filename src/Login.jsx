import { useContext } from "react"
import { authContext } from "./authentication/AuthProvider"
import { Link } from "react-router-dom";

import {FcGoogle} from 'react-icons/fc'
import {AiFillEye} from 'react-icons/ai'



export default function Login(){


  const {userLogin , googleLogin} = useContext(authContext);


    const login = (event) => {
      event.preventDefault();
      userLogin(event.target.email.value,event.target.password.value).then((data)=> {
        console.log(data) 
      })
    }

    const loginWithGoogle = () => {
      googleLogin()
    }

   



    return(
        <div>



<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={login}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" required name="email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <div className="relative">

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" required id="password" name="password" placeholder="password" className="input input-bordered w-full" />
          <AiFillEye size={30} className="absolute right-3 top-11 cursor-pointer" onClick={()=>{
            if(document.getElementById('password').type == 'password'){
              document.getElementById('password').type = 'text'
            }else{
              document.getElementById('password').type = 'password'
            }
          }}/>

          </div>

          <div className="flex flex-col w-full border-opacity-50">
                    
                    <div className="divider">OR</div>

                    <FcGoogle size={30} className="cursor-pointer" onClick={()=> loginWithGoogle()}/> 
                    
                  </div>
          <Link to={'/register'} className="underline">Dont have an account ? </Link>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>

        </div>
    )
}