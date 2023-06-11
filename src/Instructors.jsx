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
        <div className="min-h-screen">
            {/* <div className="flex gap-5">

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
            </div> */}


            <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-20 gird-cols-1 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
          {
            data?.data.map(data => 
            <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
              <figure><img src={data?.image} className='h-48 w-full rounded-[15px]'/></figure>
              <div className="">
                <h2 className="font-semibold pl-1  pt-6">Name : {data.name}</h2>
                <h2 className="font-semibold pl-1 pb-3">Email : {data.email}</h2>
              </div>
            </div>
          )}
         

      </div>
            
        </div>
    )
}