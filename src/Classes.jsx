import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure"
import axios from "axios";
import { useContext } from "react";
import { authContext } from "./authentication/AuthProvider";




export default function Classes () {

    const [axiosSecure] = useAxiosSecure();
    const { data } = useQuery({
        queryKey : ['allClasses'] ,
        queryFn : () => {
            const value = axiosSecure('/classes');
            return value;
        }
    })

    
    const {user} = useContext(authContext);

    const select = (data) => {
        axios.post(`${axiosSecure.defaults.baseURL}student/select/${user.email}&${data}`)
    }

    return(
        <div>
            <div className="flex gap-5 flex-wrap">
                {
                    data?.data.map(data => 
                    <div key={data._id} className="card w-96 bg-base-100 shadow-xl">
            
                        <figure><img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg"/></figure>
                        <div className="card-body">
                            <h2 className="card-title">Class : {data.className}</h2>
                            <h2 className="card-title">Instructor : {data.ininstructorName}</h2>
                            <h2 className="card-title">Available Seats : {data.availableSeats}</h2>
                            <h2 className="card-title">Price : {data.price}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>select(data._id)}>Select</button>
                            </div>
                        </div>
                    
                    </div>
                )}
            </div>
        </div>
    )
}