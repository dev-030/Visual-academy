


import { useQuery } from "react-query";
import useAxiosSecure from "../useAxiosSecure"
import { useContext } from "react";
import { authContext } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";


export default function Enrolledclasses(){


    const {user} = useContext(authContext);
    const [axiosSecure] = useAxiosSecure();


    const {data} = useQuery({
        queryKey : ['enrolledClasses'],
        queryFn : () => {
            const value = axiosSecure(`student/enrolledclasses/${user.email}`)
            return value;
        }
    })


    return(
        <div>
            { !data &&
                <h1>You havent enrolled any classes.</h1>
            }
            { data &&
                <div>
                    {
                        data?.data.map(data => <div key={data._id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={data?.classImage?.display_url} className="h-32"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data.className}</h2>
                                    <h1>{data.instructor}</h1>
                                    <h1>{data.price}</h1>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    }
                </div>
            }
          
        </div>
    )
}