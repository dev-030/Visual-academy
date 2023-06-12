import { useQuery } from "react-query";
import toast, { Toaster } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import useAxiosSecure from "../hooks/useAxiosSecure";



export default function ManageUsers(){

    const [axiosSecure] = useAxiosSecure();
    const {data,isLoading,refetch} = useQuery({
        queryKey:['users'],
        queryFn:()=>{
            const data = axiosSecure.get('admin/allusers')
            return data;
        }
    })


    const updateRole = (value,role) => {
        const myPromise = axiosSecure.patch('admin/updaterole',{value,role}).then((data)=>{
            refetch()
            return data;
        })
        toast.promise(myPromise, {
            loading: 'Updating...',
            success: 'User updated successfully',
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

            {!isLoading && data?.data?.length == 0 &&
                <div className="w-full flex justify-center">
                    <h1 className="text-center text-xl font-semibold mt-20 bg-[#23445b] w-fit p-2 px-4 rounded-[15px] text-white ">No users yet</h1>
                </div>
            }

            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  

            { !isLoading && data &&
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-base">
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody className="font-semibold">
                            {
                            data?.data.map((data , index )=><tr key={data._id}>
                                <th>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                                <td className="btn btn-xs btn-outline hover:bg-[#23445b] p-1 mt-[10px] mr-3" disabled={data.role=='instructor' || data.role=='admin'?true:false} onClick={()=>updateRole(data._id,'instructor')}>Instructor</td>
                                <td className="btn btn-xs btn-outline hover:bg-[#23445b] p-1 mt-[10px]" disabled={data.role=='admin'?true:false} onClick={()=>updateRole(data._id,'admin')}>admin</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}