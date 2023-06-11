import { Link } from "react-router-dom";



export default function NotFoundPage () {
    return(
        <div className="grid place-content-center h-screen relative">
            <img src="./notfound.svg" className="w-full h-screen"/>
            <Link to={'/'} className="btn btn-outline btn-sm text-white absolute bottom-[24%] left-[40%]"> HiOutlineMail</Link>
        </div>
    )
}