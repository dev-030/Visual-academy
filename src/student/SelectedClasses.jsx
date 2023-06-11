import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners"; 





export default function SelectedClasses(){

    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(authContext);

    
    const {data,refetch,isLoading} = useQuery({
        queryKey : ['student/selectedClasses'] ,
        queryFn : async() => {
           const value = await axiosSecure.get(`student/selectedclasses/${user.email}`)
           return value;
        }
    })


    const deleteSelected = (data) => {
        axiosSecure.post(`student/deleteselected/${data}&${user.email}`).then((data) => {
            if(data.data.modifiedCount == 1){
                refetch()
            }
        })
    }   


    return(
        <div>

            {!isLoading && data?.data?.length==0 &&
                <h1>You haven't selected any .</h1>
            }

            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  


            <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 w-[fit-content] gap-3 flex-wrap mx-auto relative">
                {!isLoading &&
                    data?.data.map(data => 
                    <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
                        <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
                        <div className="">
                            <h2 className="font-semibold pl-1  pt-4">Name : {data.className}</h2>
                            <h2 className="font-semibold pl-1 ">Instructor : {data.instructor}</h2>
                            <h2 className="font-semibold pl-1 ">Available Seats : {data.availableSeats}</h2>
                            <h2 className="font-semibold pl-1 pb-1">Price : {data.price}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm" onClick={()=> deleteSelected(data._id)}>Delete</button>
                                <Link to={'/dashboard/student/payment'} state={data} className="btn btn-sm">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}