import { useQuery } from "react-query";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import useAxiosSecure from "../hooks/useAxiosSecure";



export default function ManageClasses(){

    const [axiosSecure] = useAxiosSecure();
    const { data ,isLoading,refetch} = useQuery({
        queryKey : ['manageClasse'] ,
        queryFn : () => {
            const value = axiosSecure.get('admin/allclasses')
            return value;
        }
    })

    const chosen = (data,selection) => {
        if(selection == 'denied') {
            Swal.fire({
                title: 'Feedback',
                input:'textarea',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Deny',
                confirmButtonColor: '#28a745',
                preConfirm: (feedback) => {
                    axiosSecure.post(`admin/classchoose/${data}&${selection}`,{feedback}).then(() => {
                        refetch()
                    }) 
                }
            })
        }else{

            const myPromise = axiosSecure.post(`admin/classchoose/${data}&${selection}`).then((data) => {
                refetch()
                return data;
            }) 
            toast.promise(myPromise, {
                loading: 'Updating...',
                success: 'Class approved successfully.',
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
            
            refetch()
        }
    }


    return(
        <div className="min-h-screen">

            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  
            <Toaster position="bottom-right"
            reverseOrder={false}/>

            {!isLoading && data?.data?.length == 0 &&
                <div className="w-full flex justify-center">
                    <h1 className="text-center text-xl font-semibold mt-20 bg-[#23445b] w-fit p-2 px-4 rounded-[15px] text-white ">No classes yet.</h1>
                </div>
            }
        
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 w-[fit-content] gap-3 flex-wrap mx-auto relative">
            {
                data?.data.map(data => 
                <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
                    <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
                    <div className="">
                        <h2 className="font-semibold pl-1  pt-4">Name : {data.className}</h2>
                        <h2 className="font-semibold pl-1 ">Instructor : {data.instructor}</h2>
                        <h2 className="font-semibold pl-1 ">Available Seats : {data.availableSeats}</h2>
                        <h2 className="font-semibold pl-1 pb-1">Price : {data.price}</h2>
                        <div className="flex items-center">
                            <h2 className="font-semibold pl-1 pb-1 pr-1">Status : </h2>
                            <h2 className={`badge font-semibold p-2  ${data.status === 'approved' ? 'badge-success' : data.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>{data.status}</h2>
                        </div>
                        
                        <div className="card-actions justify-end pt-3">
                            <button className="btn btn-sm btn-outline" disabled={data.status=='approved'||data.status=='denied'? true : false} onClick={()=> chosen(data._id,'approved')}>Approve</button>
                            <button className="btn btn-sm btn-outline" disabled={data.status=='approved'||data.status=='denied'? true : false} onClick={()=> chosen(data._id,'denied')}>Deny</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}