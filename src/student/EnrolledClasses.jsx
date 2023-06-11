


import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authentication/AuthProvider";
import { HashLoader } from "react-spinners";


export default function Enrolledclasses(){


  const {user} = useContext(authContext);
  const [axiosSecure] = useAxiosSecure();

  const {data,isLoading} = useQuery({
    queryKey : ['enrolledClasses'],
    queryFn : async() => {
      const value = await axiosSecure.get(`student/enrolledclasses/${user.email}`)
      return value;
    }
  })
 

  return(
    <div>

      {!isLoading && data?.data?.length==0 &&
        <h1>No data found.</h1>
      }


      
      <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  

      



            
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 w-[fit-content] gap-3 flex-wrap mx-auto relative">
        {data &&
          data?.data.map(data => 
          <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
            <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
            <div className="">
              <h2 className="font-semibold pl-1  pt-4">Name : {data.className}</h2>
              <h2 className="font-semibold pl-1 ">Instructor : {data.instructor}</h2>
              <h2 className="font-semibold pl-1 ">Available Seats : {data.availableSeats}</h2>
              <h2 className="font-semibold pl-1 pb-1">Price : {data.price}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}