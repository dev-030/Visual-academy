import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure"
import { useContext } from "react";
import { authContext } from "./authentication/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Classes () {

    const [axiosSecure] = useAxiosSecure();
    const { roleData } = useContext(authContext);


    const { data } = useQuery({
        queryKey : ['allClasses'] ,
        queryFn : () => {
            const value = axios.get(`${axiosSecure.defaults.baseURL}classes`);
            return value;
        }
    })

    
    const navigate = useNavigate();

    const {user} = useContext(authContext);

   
    const select = (data) => {

        if(user){
            axiosSecure.post(`student/select/${user.email}&${data}`).then((data)=>{
                if(data == undefined){
                    navigate('/login')
                }
            })        
        }else{
            navigate('/login')
        }

    }

    return(
        <div>
            <div className="flex gap-5 flex-wrap mt-32">
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
                                <button className="btn btn-primary" disabled={data.availableSeats<=0 || roleData?.data.role=='instructor' || roleData?.data.role=='admin' ? true : false} onClick={()=>select(data._id)}>Select</button>
                            </div>
                        </div>
                    
                    </div>
                )}
            </div>
        </div>
    )
}