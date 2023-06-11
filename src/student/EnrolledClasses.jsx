


import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";


export default function Enrolledclasses(){


    const {user} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();


    const {data} = useQuery({
        queryKey : ['enrolledClasses'],
        queryFn : () => {
            const value = axiosSecure.get(`student/enrolledclasses/${user.email}`)
            return value;
        }
    })


    return(
        <div>
            { !data &&
                <h1>You havent enrolled any classes.</h1>
            }
            {/* { data &&
                <div>
                    {
                        data?.data.map(data => <div key={data._id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={data?.classImage?.display_url} className="h-32"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data.className}</h2>
                                    <h1>{data.instructor}</h1>
                                    <h1>{data.price}</h1>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    }
                </div>
            } */}


        <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 w-[fit-content] gap-6 flex-wrap mx-auto relative">
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