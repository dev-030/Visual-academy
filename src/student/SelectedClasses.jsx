import { useQuery } from "react-query";
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners"; 
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from "../hooks/useAxiosSecure";




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
        const myPromise = axiosSecure.post(`student/deleteselected/${data}&${user.email}`).then((data) => {
            if(data.data.modifiedCount == 1){
                refetch()
                return data ;
            }
        })

        toast.promise(myPromise, {
            loading: 'Updating...',
            success: 'Class removed',
        },
        {
            style: {
                duration: 2000,
                border: '1px solid #23445b',
                padding: '10px',
                color: '#ffff',
                background: '#23445b'
            }
        });
    }   


    return(
        <div>

            <Toaster position="bottom-right"
            reverseOrder={false}/>

            {!isLoading && data?.data?.length==0 &&
            <div className="w-full flex justify-center">
                <h1 className="text-center text-xl font-semibold mt-20 bg-[#23445b] w-fit p-2 px-4 rounded-[15px] text-white ">You no selected classes.</h1>
            </div>
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
                                <button className="btn btn-sm btn-outline" onClick={()=> deleteSelected(data._id)}>Delete</button>
                                <Link to={'/dashboard/student/payment'} state={data} className="btn btn-sm btn-outline">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}