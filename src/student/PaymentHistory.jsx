import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "react-query";






export default function PaymentHistory (){

    const {user} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();


    const {data} = useQuery({
        queryKey : ['paymentHistory'],
        queryFn : () => {
            const value = axiosSecure.get(`student/paymenthistory/${user.email}`)
            return value;
        }
    })

    

    return(
        <div>

            <div className="overflow-x-auto">

                {data?.data?.length == 0 &&
                    <h1>You dont have any payments</h1>
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