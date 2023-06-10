import { useContext, useState } from "react"
import { authContext } from "../authentication/AuthProvider"
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";


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

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr className="text-sm">
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
                                    <td className={`badge mt-1 ${data.status === 'approved' ? 'badge-success' : data.status === 'pending' ? 'badge-warning ml-[5px]' : 'badge-error ml-[10px]'}`} id="status">{data.status}</td>
                                    <td className="pl-10">{data?.enrolled}{data.status === 'approved' && !data.enrolled && !isLoading ? '0':'' }</td>

                                    {/* ---------  Implement Update functionality ---------- */}

                                    <td className="btn btn-sm p-2 mt-[6px]" onClick={()=>showModal(data)}>Update</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            

         


            <div>

                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal">
                <form className="modal-box" onSubmit={updateClass} id="myForm">
                        <input type="text" id="className" defaultValue={modalData?.className} className="input input-bordered w-full max-w-xs" />
                        <input type="number" id="seats" defaultValue={modalData?.availableSeats} className="input input-bordered w-full max-w-xs" />
                        <input type="number" id="price" defaultValue={modalData?.price} className="input input-bordered w-full max-w-xs" />
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn" onClick={()=>document.getElementById('myForm').reset()}>Close!</label>
                        <button type="submit" className="btn">Update</button>
                    </div>
                </form>
                </div>

            </div>

        </div>
    )
}