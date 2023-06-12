import { Outlet ,NavLink, useNavigate} from "react-router-dom";
import './dashboard.css'
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { useQuery } from "react-query";
import {MdOutlineClass} from 'react-icons/md'
import {HiOutlineUsers,HiAcademicCap,HiClipboardList} from 'react-icons/hi'
import {BsCheck2Square ,BsPencilSquare} from 'react-icons/bs'
import {FaMoneyCheck} from 'react-icons/fa'
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from "../hooks/useAxiosSecure";



export default function Dashboard(){

    const {user ,loading,roleData} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    
    return(
        <div className="mb-20 mt-10 min-h-screen flex gap-10 p-20">

            <Helmet>
                <title>Dashboard - Visual Academy</title>
            </Helmet>

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

                <h1 className="text-bold text-md text-center font-semibold">Name : {roleData?.data.name}</h1>

                {!loading&& roleData?.data?.role == 'admin' &&
                    <div className="mt-5 text-center flex flex-col" id="dashboard">
                        
                        <NavLink to={'admin/manageclasses'} className="font-semibold p-2 flex">
                            <MdOutlineClass className="mt-[2px] mr-[3px]" size={20}/>Manage Classes
                        </NavLink>
                        <NavLink to={'admin/allusers'} className="flex font-semibold p-2">
                            <HiOutlineUsers className="mt-[2px] mr-[4px]" size={20}/>Manage Users
                        </NavLink>
                    </div>
                }
    
                {!loading&& roleData?.data?.role == 'instructor' &&
                    <div className="mt-5 text-center flex flex-col" id="dashboard">
                        <NavLink to={'instructor/addclass'} className="flex font-semibold p-2">
                            <BsPencilSquare className="mt-[2px] mr-[4px] ml-[2px]" size={18}/>Add Class
                        </NavLink>
                        <NavLink to={'instructor/myclasses'} className="flex font-semibold p-2">
                            <HiClipboardList className="mt-[2px] mr-[4px]" size={22}/> My Classes
                        </NavLink>
                    </div>
                }

                {!loading&& roleData?.data?.role != 'admin' && roleData?.data?.role != 'instructor' &&
                    <div className=" mt-5 text-center flex flex-col" id="dashboard">
                        <NavLink to={'student/selectedclasses'} className="flex font-semibold p-2">
                            <BsCheck2Square className="mt-[2px] mr-[6px]" size={20}/> Selected Classes
                        </NavLink>
                        <NavLink to={'student/enrolledclasses'} className="flex font-semibold p-2">
                            <HiAcademicCap className="mt-[2px] mr-[4px]" size={22}/>  Enrolled Classes
                        </NavLink>
                        <NavLink to={'student/paymenthistory'} className="flex font-semibold p-2">
                            <FaMoneyCheck className="mt-[2px] mr-[7px]" size={20}/>  Payments
                        </NavLink>
                    </div>
                }

            </div>
            
            <div className="border rounded-[20px] w-full p-3">
                <Outlet/>
            </div>
            
        </div>
    )
}