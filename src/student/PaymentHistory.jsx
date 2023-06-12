import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";






export default function PaymentHistory (){

    const {user} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();


    const {data,isLoading} = useQuery({
        queryKey : ['paymentHistory'],
        queryFn : () => {
            const value = axiosSecure.get(`student/paymenthistory/${user.email}`)
            return value;
        }
    })

    

    return(
        <div>

            <HashLoader color="#36d7b7" loading={isLoading} size={70} className="mx-auto mt-44"/>  

            <div className="overflow-x-auto">

                {!isLoading && data?.data?.length == 0 &&
                    <div className="w-full flex justify-center">
                        <h1 className="text-center text-xl font-semibold mt-20 bg-[#23445b] w-fit p-2 px-4 rounded-[15px] text-white ">You have no payment history</h1>
                    </div>
                }

                {data?.data?.length >0 &&
                    <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>PaymentId</th>
                                <th>ClassId</th>
                                <th>userName</th>
                                <th>userEmail</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data.map((res , index) => 

                                        <tr key={index}>
                                            <th>{data?.data.length-index}</th>
                                            <td>{res.paymentId}</td>
                                            <td>{res.classId}</td>
                                            <td>{res.userName}</td>
                                            <td>{res.userEmail}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        
                    </div>
                }
            </div>
        </div>
    )
}