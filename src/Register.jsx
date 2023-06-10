import { useContext, useState } from "react"
import { authContext } from "./authentication/AuthProvider"


import { useForm } from "react-hook-form";

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "./useAxiosSecure";



import {AiFillEye} from 'react-icons/ai'
import axios from "axios";






export default function Register(){


  const navigate = useNavigate();

  const {userRegister} = useContext(authContext);

  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit, watch, getValues,formState: { errors } } = useForm();
  
  const onSubmit = (data) => {


    userRegister(data.email , data.password).then((userCredential)=>{

      updateProfile(userCredential.user , {
        displayName: data.name ,
        photoURL: data.photo_url
      })

      axios.post(`${axiosSecure.defaults.baseURL}user` , {name:data.name , email:data.email , image:data.photo_url} )


      navigate('/')
      
    })




  }




 

    return(
        <div>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Register now!</h1>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control space-y-4">

                    <input {...register("name", { maxLength: 20 , required: true })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />

                    <input {...register("email", {required: true, pattern : /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />

                    {/* { pattern : /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/ } */}

                    <div className="flex items-center relative">


                      <input id="password" type='password' {...register("password" , {required: true})} placeholder="Password" className="input input-bordered w-full max-w-xs"/>
                      <AiFillEye size={30} className="absolute right-6 cursor-pointer" onClick={()=>{
                        if(document.getElementById('password').type == 'password'){
                          document.getElementById('password').type = 'text'
                        }else{
                          document.getElementById('password').type = 'password'
                        }
                      }}/>


                      <div className="tooltip tooltip-right" data-tip="Must Contain a number string">
                        <AiOutlineInfoCircle size={20} />
                      </div>
                    </div>


                    <div className="flex items-center relative">
                    <input id="password2" {...register("confirm_password", { required: true ,
                      validate: (value) => value === watch("password") || "Passwords do not match"
                    })} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs"/>
                    <AiFillEye size={30} className="absolute right-6 cursor-pointer" onClick={()=>{
                        if(document.getElementById('password2').type == 'password'){
                          document.getElementById('password2').type = 'text'
                        }else{
                          document.getElementById('password2').type = 'password'
                        }
                      }}/>
                    </div>

                    <p className="">
                      {errors.confirm_password?.message}
                    </p>

                    <input  {...register("photo_url", { required: true })} type="text" placeholder="Photo Url" className="input input-bordered w-full max-w-xs" />
                  </div>

                  <Link to={'/login'} className="underline">Already have an account ?</Link>

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}