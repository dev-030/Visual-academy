import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"




export default function ManageUsers(){

    const [axiosSecure] = useAxiosSecure();
    const {data,refetch} = useQuery({
        queryKey:['users'],
        queryFn:()=>{
            const data = axiosSecure.get('/allusers')
            return data;
        }
    })


   

    const makeInstructor = (value) => {

        fetch(`${axiosSecure.defaults.baseURL}admin/makeinstructor/${value}` , {
            method : 'PATCH'
        }).then(data => refetch())

    }
   



    return(
        <div>
            <div className="w-full h-10  rounded-[10px] font-bold mb-2 p-2 flex justify-between">
                <h1>name</h1>
                <h1>Role</h1>
                <h1>Name</h1>
            </div>

            {
                data?.data.map(data=> <div key={data._id} className="border w-full h-10 bg-green-200 rounded-[10px] mb-2 p-2 flex justify-between">

                    <h1>{data.name}</h1>
                    <h1>{data.role}</h1>
                    <div className="flex gap-2">
                        <button className="btn btn-sm" onClick={()=>makeInstructor(data._id)}>Instructor</button>
                        <button className="btn btn-sm">admin</button>
                    </div>


                </div>)
            }

           
        </div>
    )
}