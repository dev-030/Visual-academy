import { Link } from "react-router-dom";



export default function NotFoundPage () {
    return(
        <div className="grid place-content-center h-screen relative">
            <img src="./notfound.svg" className="w-full h-screen"/>
            <div className="mt-[-128px] w-full flex justify-center">
            <Link to={'/'} className="btn btn-outline w-fit btn-md text-[16px] text-[#56dfaf] mr-10 font-bold border-4"> Home</Link>
            </div>
        </div>
    )
}