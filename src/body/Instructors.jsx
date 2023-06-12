import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"
import axios from "axios";
import { HashLoader } from "react-spinners";
import { Helmet } from 'react-helmet-async';




export default function Instructors(){
    
  const [axiosSecure] = useAxiosSecure();
  const { data ,isLoading } = useQuery({
    queryKey : ['allInstructors'],
    queryFn : () => {
      const value = axios.get(`${axiosSecure.defaults.baseURL}instructors`)
      return value;
    }
  })

    
    
  return(
    <div className="min-h-screen">

      <Helmet>
        <title>Instructors - Visual Academy</title>
      </Helmet>

      <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  
        
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-20 gird-cols-1 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
      {
        data?.data.map(data => 
        <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
          <figure><img src={data?.image} className='h-56 w-full  rounded-[15px]'/></figure>
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