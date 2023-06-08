import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure";





export default function ManageClasses(){

    const [axiosSecure] = useAxiosSecure();
    const { data } = useQuery({
        queryKey : ['manageClasse'] ,
        queryFn : () => {
            const value = axiosSecure('admin/allclasses')
            return value;
        }
    })

    const approve = () => {

    }


    const denyClass = () => {
        
    }


    return(
          <div>
        <div className="flex gap-5 flex-wrap">

        {
            data?.data.map(data => <div key={data._id} className="card w-64 bg-base-100 shadow-xl">
            
           
        <figure><img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg" className="h-32"/></figure>
        <div className="card-body">
            <h2 className="card-title">{data.className}</h2>
            <h2 className="text-sm">{data.instructor}</h2>

            <h2 className="card-title">{data.availableSeats}</h2>
            <h2 className="card-title">{data.price}</h2>


            <div className="card-actions justify-end mt-5">
            <button className="btn btn-sm">Approve</button>

            <button className="btn btn-sm">Deny</button>
            </div>
        </div>
            

            </div>)
        }
        </div>
        
    </div>
    )
}