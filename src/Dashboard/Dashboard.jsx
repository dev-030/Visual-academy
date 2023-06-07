import { Link, Outlet ,NavLink} from "react-router-dom";


import './dashboard.css'



export default function Dashboard(){

    return(
        <div className="mb-20 mt-10  flex gap-10 p-20">

            <div className="w-[20vw] border bg-base-100 rounded-[20px] p-10">

                <div className="avatar flex justify-center">
                    <div className="w-36 rounded-full">
                        <img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg" />
                    </div>
                </div>

                <h1 className="text-4xl text-bold text-center">Student</h1>
                <h1 className="text-bold text-md text-center">jamil Hossain</h1>

                <div className="space-y-5 mt-5 text-center flex flex-col" id="dashboard">

                    <NavLink to={'selectedclasses'} className="">My Classes</NavLink>
        
                    <NavLink to={'enrolledclasses'} className="">Enrolled Classes</NavLink>

                    <NavLink to={'payments'} className="">Payments</NavLink>


                    
                </div>
               
            </div>
            

            <div className="border rounded-[20px] p-10 w-full">
                <Outlet/>
            </div>

        </div>
    )
}