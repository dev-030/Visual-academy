import { useContext, useState } from "react"
import { authContext } from "./authentication/AuthProvider"


import { useForm } from "react-hook-form";

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "./useAxiosSecure";

import {FcGoogle} from 'react-icons/fc'
import {AiFillEye} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {CiLock} from 'react-icons/ci'
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'


import axios from "axios";






export default function Register(){


  const navigate = useNavigate();

  const {userRegister, googleLogin} = useContext(authContext);

  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit, watch, getValues,formState: { errors } } = useForm();
  
  const onSubmit = (data) => {

    console.log(data) 

    // userRegister(data.email , data.password).then((userCredential)=>{
    //   updateProfile(userCredential.user , {
    //     displayName: data.name ,
    //     photoURL: data.photo_url
    //   })
    //   axios.post(`${axiosSecure.defaults.baseURL}user` , {name:data.name , email:data.email , image:data.photo_url} ).then(()=>{
    //     navigate('/')
    //   })
    // })

  }

  const loginWithGoogle = () => {
    googleLogin().then((data)=> {
      axios.post(`${axiosSecure.defaults.baseURL}user` , {name:data?.user.displayName , email:data?.user.email , image:data?.user.photoURL} ).then(() => {
        window.location.replace('/')
      })
    })
  }



 

    return(
        <div>
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row w-full">
              <div className="text-center lg:text-left">
                <img src="./login.jpg" className="w-[90%]" />
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm lg:mr-12">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-4xl text-center text-[#23445b] mb-16 font-bold">Sign Up</h1>

                  <div className="mb-3 flex items-center pb-3 border-b border-[#dadfe5]">
                    <AiOutlineUser className="text-[#8090a3]" fontWeight={'100px'} size={20}/>
                    <input {...register("name", { maxLength: 20 , required: true })} type="text" placeholder="Your Name" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                  </div>

                  <div className="mb-3 flex items-center pb-3 border-b border-[#dadfe5]">
                    <HiOutlineMail className="text-[#8090a3]" fontWeight={'100px'} size={20}/>
                    <input {...register("email", {required: true, pattern : /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} type="text" placeholder="Your email address" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                  </div>



                  <div className="mb-3 flex items-center pb-3 border-b border-[#dadfe5]">
                    <CiLock className="text-[#8090a3]" size={23}/>
                    <input id="password" type='password' {...register("password" , {required: true})} placeholder="Password" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                    <AiFillEye size={25} className="cursor-pointer text-[#8090a3]" onClick={()=>{
                      if(document.getElementById('password').type == 'password'){
                        document.getElementById('password').type = 'text'
                      }else{
                        document.getElementById('password').type = 'password'
                      }
                    }}/>
                  </div>

                    
                  <div className="relative mb-3 flex items-center pb-3 border-b border-[#dadfe5]">
                    <CiLock className="text-[#8090a3]" fontWeight={'100px'} size={23}/>
                    <input type="password" id="password2" {...register("confirm_password", { required: true ,
                      validate: (value) => value === watch("password") || "Passwords do not match"
                    })} placeholder="Confirm Password" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                    <AiFillEye size={25} className="cursor-pointer text-[#8090a3]" onClick={()=>{
                      if(document.getElementById('password2').type == 'password'){
                        document.getElementById('password2').type = 'text'
                      }else{
                        document.getElementById('password2').type = 'password'
                      }
                    }}/>
                      <p className=" top-[3px] right-[25px] text-[13px] text-[red] absolute">
                      {errors.confirm_password?.message}
                      </p>
                  </div>

                  

                 

                  <div className=" flex items-center pb-3 border-b border-[#dadfe5]">
                    <MdOutlineAddPhotoAlternate className="text-[#8090a3]" fontWeight={'100px'} size={18}/>
                    <input {...register("photo_url", { required: true })} type="text" placeholder="Photo Url" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                  </div>

                  

                    {/* <input {...register("name", { maxLength: 20 , required: true })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" /> */}

                    {/* <input {...register("email", {required: true, pattern : /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" /> */}

                    {/* { pattern : /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/ } */}

                  

{/* 
                      <input id="password" type='password' {...register("password" , {required: true})} placeholder="Password" className="input input-bordered w-full max-w-xs"/>
                      <AiFillEye size={30} className="absolute right-6 cursor-pointer" onClick={()=>{
                        if(document.getElementById('password').type == 'password'){
                          document.getElementById('password').type = 'text'
                        }else{
                          document.getElementById('password').type = 'password'
                        }
                      }}/> */}


                      {/* <div className="tooltip tooltip-right" data-tip="Must Contain a number string">
                        <AiOutlineInfoCircle size={20} />
                      </div>
                       */}
                    


                    {/* <div className="flex items-center relative">
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
                    </div>  */}

                    {/* <p className="">
                      {errors.confirm_password?.message}
                    </p> */}


                    {/* <p className="">
                      {errors.confirm_password?.message}
                    </p>

                    {/* <input  {...register("photo_url", { required: true })} type="text" placeholder="Photo Url" className="input input-bordered w-full max-w-xs" /> */}

                  

                  <Link to={'/login'} className="hover:underline text-[#8090a3] pt-3">Already have an account ?</Link>

                  <div className="form-control mt-2">
                    <button className="btn btn-outline hover:bg-[#23445b]" type="submit">Sign Up</button>
                  </div>
                  <div className="flex flex-col w-full border-opacity-50">  
                  <div className="divider">OR</div>
                    <FcGoogle size={32} className="cursor-pointer" onClick={()=> loginWithGoogle()}/> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}