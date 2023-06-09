import { useContext } from "react"
import { authContext } from "../authentication/AuthProvider"
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";
import axios from "axios";



import { useForm } from "react-hook-form";



export default function MyClasses(){
    const {user}  = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();
    const {data} = useQuery({
        queryKey : 'MyClasses' ,
        queryFn : () => {
            const value = axiosSecure.get(`/instructor/myclasses/${user.email}`)
            return value;
        }
    })


    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  // watch input value by passing the name of it


    const updateClass = (data) => {

        axios.patch(`${axiosSecure.defaults.baseURL}instructor/updateclass`)
        // document.getElementById(`${data._id}`).click();
    }


    console.log(data?.data)




    return(
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                <thead>
                <tr className="text-sm">
                    <th></th>
                    <th>Class</th>
                    <th>Available Seats</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Enrolled</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data?.data.map((data,index)=> 
                            <tr key={data._id}>
                                <th>{index+1}.</th>
                                <td>{data.className}</td>
                                <td>{data.availableSeats}</td>
                                <td>{data.price}</td>
                                <td className={`badge mt-1 ${data.status === 'approved' ? 'badge-success' : data.status === 'pending' ? 'badge-warning' : 'badge-error'}`} id="status">{data.status}</td>
                                <td>0</td>
                                <td className="btn btn-sm p-1 mt-[6px]">Update</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
            

{/* <h1>{data.className}</h1>
                    <h1>{data.availableSeats}</h1>
                    <h1>{data.price}</h1>
                    <h1>{data.status}</h1>
                    <h1>{data?.feedback}</h1>
                    <button className="btn btn-sm" onClick={()=>document.getElementById(data._id).click()}>Update</button>
            */}

           
      
        </div>
    )
}