import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";





export default function SelectedClasses(){

    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(authContext);

    
    const {data,refetch} = useQuery({
        queryKey : ['selectedClasses'] ,
        queryFn : () => {
           const value = axiosSecure.get(`selectedclasses/${user.email}`)
           return value;
        }
    })

    const deleteSelected = (data) => {
        axios.post(`${axiosSecure.defaults.baseURL}student/deleteselected/${data}&${user.email}`).then((data)=>{
            if(data.data.modifiedCount == 1){
                refetch()
            }
        })
    }
    

    return(
        <div>
            <div className="flex flex-wrap gap-2">

            {
                data?.data.map(data => <div key={data._id}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={data.classImage.display_url} className="h-32"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.className}</h2>
                        <h1>{data.instructor}</h1>
                        <h1>{data.price}</h1>
                        <div className="card-actions justify-end">
                        <button className="btn btn-sm" onClick={()=> deleteSelected(data._id)}>Delete</button>
                        <Link to={'/dashboard/student/payment'} state={data} className="btn btn-sm">Buy Now</Link>

                        </div>
                    </div>
                    </div>
                </div>)
            }

</div>

        </div>
    )
}