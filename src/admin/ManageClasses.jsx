import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure";
import Swal from "sweetalert2";





export default function ManageClasses(){

    const [axiosSecure] = useAxiosSecure();
    const { data ,refetch} = useQuery({
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
                preConfirm: (feedback) => {
                    axiosSecure.post(`admin/classchoose/${data}&${selection}`,{feedback}).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Denied',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        refetch()
                    }) 
                }
            })
        }else{
            axiosSecure.post(`admin/classchoose/${data}&${selection}`).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved',
                    showConfirmButton: false,
                    timer: 1000
                })
                refetch()
            }) 
            refetch()
        }
    }


   


    return(
          <div>
        <div className="flex gap-5 flex-wrap">

        {
            data?.data.map(data => <div key={data._id} className="card w-64 bg-base-100 shadow-xl">
            
           
        <figure><img src="https://i.ibb.co/LxV7GQ6/vector-users-icon.jpg" className="h-32"/></figure>
        <div className="card-body">
            <h2 className="card-title">{data.className}</h2>
            <h2 className="text-sm">{data.instructor}</h2>

            <h2 className="card-title">{data.availableSeats}</h2>
            <h2 className="card-title">{data.price}</h2>
            <h2 className="card-title">{data.status}</h2>



            <div className="card-actions justify-end mt-5">
            <button className="btn btn-sm" onClick={()=> chosen(data._id,'approved')}>Approve</button>

            <button className="btn btn-sm" onClick={()=> chosen(data._id,'denied')}>Deny</button>
            </div>
        </div>
            

            </div>)
        }
        </div>
        
    </div>
    )
}