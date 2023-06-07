import { useContext } from "react"
import { authContext } from "./authentication/AuthProvider"


import { useForm } from "react-hook-form";

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from "react-router-dom";








export default function Register(){

  const {userRegister} = useContext(authContext);

  const { register, handleSubmit, watch, getValues,formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
        console.log(data)

        userRegister(data.email , data.password).then(data => console.log(data))

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

                    <input {...register("name", { maxLength: 20 })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />

                    <input {...register("email", { pattern : /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />

                    {/* { pattern : /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/ } */}

                    <div className="flex items-center">

                    <input {...register("password")} placeholder="Password" className="input input-bordered w-full max-w-xs"/>

                    <div className="tooltip tooltip-right" data-tip="Must Contain a number string">
                    <AiOutlineInfoCircle size={20} />

                    </div>

                    </div>



                    <input {...register("confirm_password", { 
                    
                        validate: (value) => value === watch("password") || "Passwords do not match"
                      
                      })} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs"/>


                      <p className="">
                        {errors.confirm_password?.message}
                      </p>

                    <input  {...register("photo_url", { })} type="text" placeholder="Photo Url" className="input input-bordered w-full max-w-xs" />

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