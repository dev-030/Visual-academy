import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";





export default function SelectedClasses(){

    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(authContext);

    
    const {data,refetch,isLoading} = useQuery({
        queryKey : ['student/selectedClasses'] ,
        queryFn : () => {
           const value = axiosSecure.get(`student/selectedclasses/${user.email}`)
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
        <div className="flex justify-center">
            <div className="flex flex-wrap gap-2">

            { !isLoading && !data && 
                <h1>You have no selected classes</h1>
            }

            { !isLoading && data?.data.length==0 && 
                <h1>You have no selected classes</h1>
            }
            

            {/* { !isLoading &&
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
            } */}

        <div className="flex w-[fit-content] gap-2 flex-wrap mx-auto relative">
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

        </div>
    )
}