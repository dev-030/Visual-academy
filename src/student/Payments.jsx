
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payments(){

    const navigate = useNavigate();

    const location = useLocation();
  const state = location.state;

  console.log(state)

    return(
        <div>
            <BsArrowLeftCircle size={32} className='cursor-pointer' onClick={()=>navigate(-1)}/>
            <div>

            </div>
        </div>
    )
}