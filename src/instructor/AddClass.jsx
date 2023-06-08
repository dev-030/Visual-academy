import { useContext } from "react"
import { authContext } from "../authentication/AuthProvider"

import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../useAxiosSecure";
import Swal from "sweetalert2";





export default function AddClasses(){

    const [axiosSecure] = useAxiosSecure();

    const { user } =  useContext(authContext);

    const apiKey = '66d945b454fad2da099d17624012543e'

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        
        const formdata = new FormData();
        formdata.append('image',data.classImage[0])
              
        axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}` , formdata).then(res => {

            if(res.data.success == true){
                data.classImage = res.data.data;
                data.status = 'pending';
                data.instructor = user.email;
                data.ininstructorName = user?.displayName;

                axios.post(`${axiosSecure.defaults.baseURL}instructor/addclass` , data).then(data =>{
                    Swal.fire(
                        'Add Request sent',
                        '',
                        'success'
                      )
                })
            }
            
        })

    }


    

    
    return(
        <div>

            <h1 className="font-bold text-2xl text-center mb-10">Add New Class</h1>

            <form className="grid" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex gap-5 mt-5 justify-center">
                    <input type="text" {...register("className")} placeholder="Class Name" className="input input-bordered w-full max-w-xs" />
                    <input type="text" {...register("availabeSeats")} placeholder="Available Seats" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="flex gap-5 mt-5 justify-center">
                    <input type="text" {...register("instructorName")} placeholder="You can't touch this" defaultValue={user?.name} className="input input-bordered w-full max-w-xs" disabled />
                    <input type="text" {...register("instructorEmail")} placeholder="You can't touch this" defaultValue={user?.email} className="input input-bordered w-full max-w-xs" disabled />
                </div>

                <div className="flex gap-5 mt-5 justify-center">   
                    <input type="text" {...register("price")} placeholder="Price" className="input input-bordered w-full max-w-xs" />
                    <input type="file" {...register("classImage")} className="file-input file-input-bordered w-full max-w-xs" />
                </div> 

           
         
                <button type="submit" className="btn mt-5 mx-auto ">Submit</button>
          


            </form>
        </div>
    )
}