import { useContext } from "react"
import { authContext } from "./authentication/AuthProvider"
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";
import {FcGoogle} from 'react-icons/fc'
import {AiFillEye} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import {MdLock} from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';



export default function Login(){


  const {userLogin , googleLogin} = useContext(authContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const notify = (value) => toast.error(`${value}` , {
    style: {
      border: '1px solid #23445b',
      padding: '10px',
      color: '#ffff',
      background: '#23445b'
    }
  });


  const login = (event) => {
    event.preventDefault();
    userLogin(event.target.email.value,event.target.password.value).then(()=>{
      navigate('/');
    }).catch((error)=>{
      if(error.message == 'Firebase: Error (auth/wrong-password).'){
        notify('wrong-password.')
      }
      if(error.message == 'Firebase: Error (auth/user-not-found).'){
        notify('user not found.')
      } 
    })
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

      <Toaster position="bottom-right"
      reverseOrder={false}/>

      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row w-full">
          <div >
            <img src="./login.jpg" className="w-[90%]" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm mr-12">
            <form className="card-body" onSubmit={login}>
              <h1 className="text-4xl text-center text-[#23445b] mb-16 font-bold">Welcome Back </h1>
              <div className=" flex items-center pb-3 border-b border-[#dadfe5]">
                <FaUser className="text-[#8090a3]" fontWeight={'100px'} size={18}/>
                <input type="email" required name="email" placeholder="Your email address" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
              </div>
              <div className="mt-5 flex items-center pb-3 border-b border-[#dadfe5]">
                <MdLock className="text-[#8090a3]" fontWeight={'100px'} size={23}/>
                <input type="password" id="password" required name="password" placeholder="password" className="appearance-none bg-transparent border-none w-full text-gray-700 pl-7 font-semibold  leading-tight focus:outline-none" />
                <AiFillEye size={25} className="cursor-pointer text-[#8090a3]" onClick={()=>{
                  if(document.getElementById('password').type == 'password'){
                    document.getElementById('password').type = 'text'
                  }else{
                    document.getElementById('password').type = 'password'
                  }
                }}/>
              </div>
              <Link to={'/register'} className="hover:underline text-[#8090a3] pt-3">Dont have an account ? </Link>
              <div className="form-control mt-3">
                <button type="submit" className="btn btn-outline hover:bg-[#23445b]">Login</button>
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