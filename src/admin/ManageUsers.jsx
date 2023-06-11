import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import axios from "axios";




export default function ManageUsers(){

    const [axiosSecure] = useAxiosSecure();
    const {data,refetch} = useQuery({
        queryKey:['users'],
        queryFn:()=>{
            const data = axiosSecure.get('admin/allusers')
            return data;
        }
    })


   

    const updateRole = (value,role) => {
        axiosSecure.patch('admin/updaterole',{value,role}).then(()=>{
            refetch()
        })
    }





    return(
        <div>
           
            {/* {
                data?.data.map(data=> <div key={data._id} className="border w-full h-10 bg-green-200 rounded-[10px] mb-2 p-2 flex justify-between">

                    <h1>{data.name}</h1>
                    <h1>{data.role}</h1>
                    <div className="flex gap-2">
                        <button className="btn btn-sm" onClick={()=>makeInstructor(data._id)}>Instructor</button>
                        <button className="btn btn-sm">admin</button>
                    </div>


                </div>)
            } */}


<div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr className="text-base">
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody className="font-semibold">

        {
        data?.data.map((data , index )=><tr key={data._id}>
            <th>{index+1}</th>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td className="btn btn-xs btn-outline hover:bg-[#23445b] p-1 mt-[10px] mr-3" disabled={data.role=='instructor' || data.role=='admin'?true:false} onClick={()=>updateRole(data._id,'instructor')}>Instructor</td>
            <td className="btn btn-xs btn-outline hover:bg-[#23445b] p-1 mt-[10px]" disabled={data.role=='admin'?true:false} onClick={()=>updateRole(data._id,'admin')}>admin</td>
        </tr>
       )}
     
      


    </tbody>
  </table>
</div>

           
        </div>
    )
}