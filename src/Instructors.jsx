import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure"
import axios from "axios";




export default function Instructors(){
    
    const [axiosSecure] = useAxiosSecure();
    const { data } = useQuery({
        queryKey : ['allInstructors'],
        queryFn : () => {
            const value = axios.get(`${axiosSecure.defaults.baseURL}instructors`)
            return value;
        }
    })

   


    return(
        <div>
            <div className="flex gap-5">

            {
                data?.data.map(data => <div key={data._id} className="card w-96 bg-base-100 shadow-xl">
                
               
            <figure><img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg"/></figure>
            <div className="card-body">
                <h2 className="card-title">{data.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
                

                </div>)
            }
            </div>
            
        </div>
    )
}