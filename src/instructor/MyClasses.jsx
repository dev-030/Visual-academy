import { useContext } from "react"
import { authContext } from "../authentication/AuthProvider"
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";
import axios from "axios";






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

    const updateClass = (data) => {

        axios.patch(`${axiosSecure.defaults.baseURL}instructor/updateclass`)
        // document.getElementById(`${data._id}`).click();
    }





    return(
        <div>
               <div>
            <div className="w-full h-10  rounded-[10px] font-bold mb-2 p-2 flex justify-between">
                <h1>name</h1>
                <h1>Role</h1>
                <h1>Name</h1>
            </div>

            {
                data?.data.map(data=> <div key={data._id} className="border w-full h-10 bg-green-200 rounded-[10px] mb-2 p-2 flex justify-between">

                    <h1>{data.className}</h1>
                    <h1>{data.availabeSeats}</h1>
                    <h1>{data.price}</h1>
                    <h1>{data.status}</h1>
                    <h1>{data?.feedback}</h1>
                    <button className="btn btn-sm" onClick={()=>document.getElementById(data._id).click()}>Update</button>

                    <input type="checkbox" id={data._id} className="modal-toggle" />
                    <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{data._id}</h3>
                        <p className="py-4">This modal works with a hidden checkbox!</p>
                        <div className="modal-action">
                        <label htmlFor={data._id} className="btn">Close!</label>
                        <button className="btn" onClick={()=>updateClass(data._id)}>Update</button>

                        </div>
                    </div>
                    </div>

                </div>)
            }

            
           

           
        </div>
        </div>
    )
}