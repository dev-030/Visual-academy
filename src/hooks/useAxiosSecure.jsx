import axios from "axios";
import app from "../authentication/firebase.config";

import {getAuth,signOut}  from 'firebase/auth'
const auth = getAuth(app)


const axiosSecure = axios.create({
    baseURL : 'https://summer-camp-jy3vq3ac5q-nn.a.run.app/'
});


export default function useAxiosSecure(){


  axiosSecure.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access-token')
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
  });

    
    
  axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
    if(error.response && (error.response.status === 401 || error.response.status === 403)){
      signOut(auth)
      localStorage.removeItem('access-token')
    }
  });
    

  return [axiosSecure]
}

