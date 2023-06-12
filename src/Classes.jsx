import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure"
import { useContext } from "react";
import { authContext } from "./authentication/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"; 
import toast, { Toaster } from 'react-hot-toast';




export default function Classes () {

    const [axiosSecure] = useAxiosSecure();
    const { roleData,user,loading } = useContext(authContext);
    const navigate = useNavigate();

   

    const {data:selectedData,refetch:slectedRefetch,isLoading:selectedLoading} = useQuery({
        queryKey : ['sl'] ,
        queryFn : async() => {
        const value = await axiosSecure.get((!loading&& user )? (roleData?.data.role=='admin')?' ':(roleData?.data.role=='instructor')?' ':`student/selectedclasses/${user?.email}}`:'')
        return value;
        },
        enabled : !loading
    })


    const {data:enrolledData,isLoading:enrolledLoading} = useQuery({
        queryKey : ['en'],
        queryFn : async() => {
        const value = await axiosSecure.get((!loading&& user )? (roleData?.data.role=='admin')?' ':(roleData?.data.role=='instructor')?' ':`student/enrolledclasses/${user?.email}`:'')
        return value;
        },
        enabled : !selectedLoading
    })


    const { data,isLoading,refetch} = useQuery({
        queryKey : ['allClasses'] ,
        queryFn : async() => {
            const value = await axios.get(`${axiosSecure.defaults.baseURL}classes`);
            
            return value;
        },
        enabled : !enrolledLoading
    })

    
    const select = (data) => {
        if(user){
            const myPromise = axiosSecure.post(`student/select/${user?.email}&${data}`).then((data)=>{
                if(data == undefined){
                    navigate('/login')
                }
                refetch()
                slectedRefetch()
                return data;
            })
            toast.promise(myPromise, {
                loading: 'Updating...',
                success: 'Selected successfully',
            },
            {style: {
                    duration: 2000,
                    border: '1px solid #23445b',
                    padding: '10px',
                    color: '#ffff',
                    background: '#23445b'
                }
            });        
        }else{
            navigate('/login')
        }
    }


    return(
        <div className="min-h-screen">
            <Toaster position="bottom-right"
            reverseOrder={false}/>
            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  

            <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-20 gird-cols-1 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
                {
                data?.data.map(data => 
                <div key={data._id}  className={`${data.availableSeats<=0? 'shadow-red' : ''} z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3`}>
                    <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
                    <div className="">
                    <h2 className="font-semibold pl-1  pt-4">Class : {data.className}</h2>
                    <h2 className="font-semibold pl-1 ">Instructor : {data.ininstructorName}</h2>
                    <h2 className="font-semibold pl-1 ">Available Seats : {data.availableSeats}</h2>
                    <h2 className="font-semibold pl-1 pb-1">Price : {data.price}</h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm btn-outline" 
                        disabled={data.availableSeats<=0 || roleData?.data.role=='instructor' || roleData?.data.role=='admin' ? true : false ||
                        (selectedData?.data.some(obj => obj._id === data._id))? true : (enrolledData?.data.some(obj => obj._id === data._id))? true : false
                        }onClick={()=>select(data._id)}>
                        {(selectedData?.data.some(obj => obj._id === data._id))? 'Selected' : (enrolledData?.data.some(obj => obj._id === data._id))? 'Enrolled' : 'Select'
                        }
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}