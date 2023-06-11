import { Outlet ,NavLink, useNavigate} from "react-router-dom";


import './dashboard.css'
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure";




export default function Dashboard(){

    const {user ,loading,roleData} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();


    const useless = useQuery({
        queryKey : [ 'dashboardroute'] , 
        queryFn : async() => {
            await axiosSecure.get(`/dashboard/users/check/${user?.email}`).then(data => {
                // navigate(`/dashboard${ data?.data?.role === 'admin' ? '/admin/manageclasses' : data?.data?.role === 'instructor' ? '/instructor/addclass' : '/student/selectedclasses'}`)
            })
        }
    })

    
    return(
        <div className="mb-20 mt-10 min-h-screen flex gap-10 p-20">

            <div className="w-[20vw] border bg-base-100 rounded-[20px] p-10">


                

                <div className="avatar flex justify-center">
                    <div className="w-36 rounded-full">
                        <img src={roleData?.data.image} />
                    </div>
                </div>

                <h1 className="text-4xl text-bold text-center">
                    {!loading&& roleData?.data?.role == 'admin' &&
                        <>{roleData.data.role}</>
                    }
                    {!loading&& roleData?.data?.role == 'instructor' &&
                        <>{roleData.data.role}</>
                    }
                    {!loading&& roleData?.data?.role != 'admin' && roleData?.data?.role != 'instructor' &&
                        <>Student</>
                    }
                </h1>

                <h1 className="text-bold text-md text-center">{roleData?.data.name}</h1>



                    {!loading&& roleData?.data?.role == 'admin' &&
                        <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'admin/manageclasses'} className="font-semibold p-2">Manage Classes</NavLink>
                            <NavLink to={'admin/allusers'} className="font-semibold p-2">Manage Users</NavLink>
                        </div>
                    }
    

                    {!loading&& roleData?.data?.role == 'instructor' &&
                        <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'instructor/addclass'} className="font-semibold p-2">Add Class</NavLink>
                            <NavLink to={'instructor/myclasses'} className="font-semibold p-2">My Classes</NavLink>
                        </div>
                    }


                    {!loading&& roleData?.data?.role != 'admin' && roleData?.data?.role != 'instructor' &&
                        <div className=" mt-5 text-center flex flex-col" id="dashboard">
                            <NavLink to={'student/selectedclasses'} className="font-semibold p-2">Selected Classes</NavLink>
                            <NavLink to={'student/enrolledclasses'} className="font-semibold p-2">Enrolled Classes</NavLink>
                            <NavLink to={'student/paymenthistory'} className="font-semibold p-2">Payments</NavLink>
                        </div>
                    }



                    
               
            </div>
            

            <div className="border rounded-[20px] w-full">
            

            


            <Outlet/>
            </div>

        </div>
    )
}