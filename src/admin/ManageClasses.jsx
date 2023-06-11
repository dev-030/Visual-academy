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
                confirmButtonColor: '#28a745',
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
          <div className="min-h-screen">
        {/* <div className="flex gap-5 flex-wrap">

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
        </div> */}


        
        <div className="flex w-[fit-content] gap-2 flex-wrap mx-auto relative">
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