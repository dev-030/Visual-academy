import { Link, Outlet ,NavLink} from "react-router-dom";


import './dashboard.css'
import { useContext, useState } from "react";
import { authContext } from "../authentication/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure";



export default function Dashboard(){

    const {user ,loading} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();
    const [role,setRole] = useState(null);


    const {data,isLoading} = useQuery({
        queryKey:['val'],
        enabled:!loading,
        queryFn: ()=>{
            const value = axiosSecure.get(`/users/check/${user?.email}`)
            return value;
        }
    })

    
    return(
        <div className="mb-20 mt-10  flex gap-10 p-20">

            <div className="w-[20vw] border bg-base-100 rounded-[20px] p-10">

                <div className="avatar flex justify-center">
                    <div className="w-36 rounded-full">
                        <img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg" />
                    </div>
                </div>

                <h1 className="text-4xl text-bold text-center">
                    {!isLoading&& data?.data?.role == 'admin' &&
                        <>{data.data.role}</>
                    }
                    {!isLoading&& data?.data?.role == 'instructor' &&
                        <>{data.data.role}</>
                    }
                    {!isLoading&& data?.data?.role != 'admin' && data?.data?.role != 'instructor' &&
                        <>Student</>
                    }
                </h1>

                <h1 className="text-bold text-md text-center">{data?.data.name}</h1>



                    {!isLoading&& data?.data?.role == 'admin' &&
                        <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'selectedclasses'} className="">Manage Classes</NavLink>
                            <NavLink to={'enrolledclasses'} className="">Manage Users</NavLink>
                        </div>
                    }


                    {!isLoading&& data?.data?.role == 'instructor' &&
                        <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'selectedclasses'} className="">Add Class</NavLink>
                            <NavLink to={'enrolledclasses'} className="">My Classes</NavLink>
                        </div>
                    }


                    {!isLoading&& data?.data?.role != 'admin' && data?.data?.role != 'instructor' &&
                        <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'selectedclasses'} className="">My Classes</NavLink>
                            <NavLink to={'enrolledclasses'} className="">Enrolled Classes</NavLink>
                            <NavLink to={'payments'} className="">Payments</NavLink>
                        </div>
                    }



                    
               
            </div>
            

            <div className="border rounded-[20px] p-10 w-full">
                <Outlet/>
            </div>

        </div>
    )
}