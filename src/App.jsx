import { useContext, useEffect, useState } from 'react'
import { authContext } from './authentication/AuthProvider'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import axios from 'axios';



function App() {
  const [count, setCount] = useState(0)

  const {user ,loading} = useContext(authContext);

 
  const [axiosSecure] = useAxiosSecure();



  const { data: classData } = useQuery({
    queryKey : ['allClasses'] ,
    queryFn : async() => {
      const value = axios.get(`${axiosSecure.defaults.baseURL}classes`);
      return value;
    }
  })


  const { data: instructorData } = useQuery({
    queryKey : ['ins'],
    queryFn : async() => {
      const value = axios.get(`${axiosSecure.defaults.baseURL}instructors`)
      return value;
    }
  })



  // console.log(instructorData?.data[0])



  return (
    <>




    <section>
     

      <div className="hero min-h-screen bg-[url('https://i.ibb.co/qybRmGh/Screenshot-2023-06-09-202621-1920x1147.png')]">
  <div className="hero-content flex-col-reverse lg:flex-row-reverse">
    <img src="https://i.ibb.co/KWHbwys/dswamin.png" className="max-w-[30rem]" />
    <div>
      <h1 className="text-5xl font-bold max-w-sm text-white">Teaching and Learning <br /> center</h1>
      
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    </section>



    <section className='my-20 bg-green-100'>



      <h1 className='text-5xl text-center py-10'>Education and Learning</h1>
      <p className='text-center text-xl pb-20 font-bold'>Learning is something we do almost every day</p>


      <div className='flex gap-5 justify-center'>

        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className='bg-yellow-200 text-center rounded-full w-20 h-20'><h1 className='text-4xl pt-5'>01</h1></div>
          <h1>Teaching</h1>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className='bg-yellow-200 text-center rounded-full w-20 h-20'><h1 className='text-4xl pt-5'>01</h1></div>
          <h1>Teaching</h1>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className='bg-yellow-200 text-center rounded-full w-20 h-20'><h1 className='text-4xl pt-5'>01</h1></div>
          <h1>Teaching</h1>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className='bg-yellow-200 text-center rounded-full w-20 h-20'><h1 className='text-4xl pt-5'>01</h1></div>
          <h1>Teaching</h1>
        </div>

      </div>



    </section>

     
    <section>
      <h1 className='text-4xl font-bold text-center'>Browse Our Popular Classes</h1>
      <div className="grid grid-cols-3 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
          {
            classData?.data.map(data => 
            <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
              <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
              <div className="">
                <h2 className="">Class : {data.className}</h2>
                <h2 className="">Instructor : {data.ininstructorName}</h2>
                <h2 className="">Available Seats : {data.availableSeats}</h2>
                <h2 className="">Price : {data.price}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={data.availableSeats<=0? true : false} onClick={()=>select(data._id)}>Select</button>
                </div>
              </div>
            </div>
          )}
          <div className='absolute z-0 bottom-[11rem] h-[25rem] right-[-95px] w-[1100px] rounded-[40px] bg-base-200'></div>
      </div>
    </section>




    <section>

      <h1 className='text-4xl font-bold text-center mb-10'>Our Popular Instructors</h1>

      <div className="grid grid-cols-3 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
        {
            instructorData?.data.map(data => 
            <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
    
                <figure><img src={data?.image} className='h-48 w-full rounded-[15px]'/></figure>
                <div className="">
                    <h2 className="">Class : {data.className}</h2>
                    <h2 className="">Instructor : {data.ininstructorName}</h2>
                    <h2 className="">Available Seats : {data.availableSeats}</h2>
                    <h2 className="">Price : {data.price}</h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" disabled={data.availableSeats<=0? true : false} onClick={()=>select(data._id)}>Select</button>
                    </div>
                </div>
            
            </div>
        )}

          
      </div>
    </section>

  

    
   
    </>
  )
}

export default App

