import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure"




export default function Classes () {

    const [axiosSecure] = useAxiosSecure();
    const { data } = useQuery({
        queryKey : ['allClasses'] ,
        queryFn : () => {
            const value = axiosSecure('/classes');
            return value;
        }
    })

    const select = (data) => {
        console.log(data)
    }

    return(
        <div>
        <div className="flex gap-5 flex-wrap">

        {
            data?.data.map(data => <div key={data._id} className="card w-96 bg-base-100 shadow-xl">
            
           
        <figure><img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg"/></figure>
        <div className="card-body">
            <h2 className="card-title">{data.className}</h2>
            <h2 className="card-title">{data.instructor}</h2>

            <h2 className="card-title">{data.availableSeats}</h2>
            <h2 className="card-title">{data.price}</h2>


            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>select(data._id)}>Select</button>
            </div>
        </div>
            

            </div>)
        }
        </div>
        
    </div>
    )
}