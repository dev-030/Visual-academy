import { useContext, useState } from "react"
import { authContext } from "../authentication/AuthProvider"
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";


export default function MyClasses(){
    const {user}  = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();

    
    const {data,isLoading,refetch} = useQuery({
        queryKey : 'MyClasses' ,
        queryFn : () => {
            const value = axiosSecure.get(`/instructor/myclasses/${user.email}`)
            return value;
        }
    })


    const[modalData,setModalData] = useState(null);

    const showModal = (data) => {
        setModalData(data)
        window.my_modal_6.click()
    }

    const feedbackModal = (data) => {
        setModalData(data)
        window.my_modal_7.click()
    }

    const updateClass = (event) => {
        event.preventDefault();


        const updatedData = {
            className : event.target.className.value ,
            availableSeats : parseInt(event.target.seats.value) ,
            price : parseInt(event.target.price.value)
        }
        axiosSecure.patch(`instructor/updateclass/${modalData._id}` , {updatedData}).then((res)=>{
            if(res.data.modifiedCount>0){
                document.getElementById('myForm').reset();
                refetch();
                window.my_modal_6.click()
            }
        })     
      
    }


    return(
        <div>
            
            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  


            {!isLoading && data?.data?.length == 0 &&
                <div className="w-full flex justify-center">
                    <h1 className="text-center text-xl font-semibold mt-20 bg-[#23445b] w-fit p-2 px-4 rounded-[15px] text-white ">You have no classes.</h1>
                </div>
            }


            {!isLoading && data &&
                <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr className="text-base font-semibold ">
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
                                    <td className="pl-14">{data.availableSeats}</td>
                                    <td className="pl-6">{data.price}</td>
                                    <td className={`badge mt-1 ${data.status === 'approved' ? 'badge-success ml-[2px]' : data.status === 'pending' ? 'badge-warning ml-[5px]' : 'badge-error ml-[9px]'}`} id="status">{data.status}</td>
                                    <td className="pl-10">{data?.enrolled}{data.status === 'approved' && !data.enrolled && !isLoading ? '0':'' }</td>

                                    {/* ---------  Implement Update functionality ---------- */}

                                    {
                                        (data.status=='denied')? 
                                        <td className="btn btn-outline text-error hover:bg-[red] hover:border-[red] btn-sm p-2 mt-[6px]" onClick={()=>feedbackModal(data)}>Feed......</td>
                                        :
                                        <td className="btn btn-outline hover:bg-[#23445b] btn-sm p-2 mt-[6px]" onClick={()=>showModal(data)}>Update</td>

                                    }

                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            }
            
            

         


            <div>
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal">
                <form className="bg-[#23445b] p-10 rounded-[10px] space-y-3" onSubmit={updateClass} id="myForm">
                    <div className="flex items-center">
                        <h1 className="pr-2 font-semibold text-white">Class : </h1>
                        <input type="text" id="className" defaultValue={modalData?.className} className="input input-bordered font-semibold" />
                    </div>
                    <div className="flex items-center">
                        <h1 className="pr-2 font-semibold text-white">Seats : </h1>
                        <input type="number" id="seats" defaultValue={modalData?.availableSeats} className="input input-bordered font-semibold" />
                    </div>
                    <div className="flex items-center">
                        <h1 className="pr-2 font-semibold text-white">Price : </h1>
                        <input type="number" id="price" defaultValue={modalData?.price} className="input input-bordered font-semibold" />
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-sm hover:bg-[red] hover:border-[red] btn-outline text-white" onClick={()=>document.getElementById('myForm').reset()}>Close!</label>
                        <button type="submit" className="btn btn-sm hover:border-[green] btn-outline hover:bg-[green] text-white">Update</button>
                    </div>
                </form>
                </div>
            </div>

            
            <div>
                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div className="modal">
                <form className="bg-[#23445b] p-4 rounded-[10px] space-y-3" onSubmit={updateClass} id="myForm2">
                    <div className="min-w-[20rem] min-h-[10rem]">
                        <h1 className="text-white text-center font-bold text-xl mb-2">FeedBack</h1>
                        <h1 className="text-white">{modalData?.feedback}</h1>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_7" className="btn btn-sm hover:bg-[red] hover:border-[red] btn-outline text-white">Close!</label>
                    </div>
                </form>
                </div>
            </div>

        </div>
    )
}