import { useContext } from "react"
import { authContext } from "../authentication/AuthProvider"
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";






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
                    


                </div>)
            }

           
        </div>
        </div>
    )
}