import { useContext, useEffect, useState } from 'react'
import { authContext } from './authentication/AuthProvider'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import axios from 'axios';


import './App.css'


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




  // console.log(classData?.data.slice(0, 6))




  return (
    <>




    <section>
     

      <div className="hero min-h-screen bg-[url('https://i.ibb.co/qybRmGh/Screenshot-2023-06-09-202621-1920x1147.png')]">
  <div className="hero-content flex-col-reverse lg:flex-row-reverse lg:gap-36">
    <img src="https://i.ibb.co/KWHbwys/dswamin.png" className=" w-[30rem]" />
    <div className='text-center lg:text-left'>
      <h1 className="text-5xl leading-tight font-semibold lg:mt-[-15rem] max-w-md pt-20 text-white font-Dosis">Unlock Your Photographic Potential at Visual Academy </h1>

      <p className='text-white text-xl font-medium max-w-sm pt-5'>Further your professional developments with online courses and teaching materials.</p>
      
      <button className="btn btn-outline text-white mt-5 mb-10 font-bold">Get Started</button>
    </div>
  </div>
</div>
    </section>



    <section className='pb-10 bg-[#23445b]' id='fix'>



      <h1 className='text-5xl text-center py-10 text-white font-bold'>Capture. Create. Inspire.</h1>
      <p className='text-center text-xl pb-20 font-semibold text-white'>Unleash Your Visual Potential with Visual Academy.</p>


      <div className='flex gap-5 flex-wrap justify-center'>

        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className=' bg-[#25797c] text-white text-center rounded-full w-20 h-20'><h1 className='text-4xl font-bold pt-5'>01</h1></div>
          <h1 className='font-bold text-[25px] py-4 '>Teaching</h1>
          <p className='font-semibold text-[15px]'>Unleash your potential through expert instruction at Visual Academy. Join us for a transformative learning experience that will elevate your photography skills.</p>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className=' bg-[#25797c] text-white text-center rounded-full w-20 h-20'><h1 className='text-4xl font-bold pt-5'>01</h1></div>
          <h1 className='font-bold text-[25px] py-4 '>Innovations</h1>
          <p className='font-semibold text-[15px]'>Discover your creative vision at Visual Academy. Turn ordinary moments into extraordinary works of art.</p>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className=' bg-[#25797c] text-white text-center rounded-full w-20 h-20'><h1 className='text-4xl font-bold pt-5'>01</h1></div>
          <h1 className='font-bold text-[25px] py-4 '> Creativity</h1>
          <p className='font-semibold text-[15px]'>Discover your creative vision at Visual Academy. Turn ordinary moments into extraordinary works of art.</p>
        </div>
        <div className='w-[15rem] h-[23rem] bg-blue-200 p-10'>
          <div className=' bg-[#25797c] text-white text-center rounded-full w-20 h-20'><h1 className='text-4xl font-bold pt-5'>01</h1></div>
          <h1 className='font-bold text-[25px] py-4 '>Community</h1>
          <p className='font-semibold text-[15px]'>Join our vibrant photography community. Connect with like-minded artists and foster lifelong relationships.</p>
        </div>

      </div>



    </section>

     
    <section>
    <h1 className='text-4xl text-center font-bold text-[#4b5262] mt-32 mb-14'>Browse Our Popular Classes</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1   w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
          {
            classData?.data.slice(0, 6).map(data => 
            <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
              <figure><img src={data?.classImage?.display_url} className='h-48 w-full rounded-[15px]'/></figure>
              <div className="">
                <h2 className="font-semibold pl-1  text-[#4b5262] pt-4">Class : {data.className}</h2>
                <h2 className="font-semibold pl-1  text-[#4b5262]">Instructor : {data.ininstructorName}</h2>
                <h2 className="font-semibold pl-1  text-[#4b5262]">Available Seats : {data.availableSeats}</h2>
                <h2 className="font-semibold pl-1 pb-1 text-[#4b5262]">Price : {data.price}</h2>
                
              </div>
            </div>
          )}
          <div className='absolute z-0 md:w-[48rem] md:h-[45rem] md:top-[10rem] md:left-[-86px] lg:bottom-[11rem] lg:h-[25rem] lg:right-[-95px] lg:w-[1100px] rounded-[40px] bg-[#23445b]'></div>

      </div>
    </section>



    <section>
    <h1 className='text-4xl text-center font-bold text-[#4b5262] mt-32 mb-14'>Our Popular Instructors</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 w-[fit-content] gap-6 flex-wrap mb-44 my-5 mx-auto relative">
          {
            instructorData?.data.slice(0, 6).map(data => 
            <div key={data._id} className="z-10 rounded-[20px] w-72 bg-base-100 shadow ring-gray-300 ring-1 p-3">
              <figure><img src={data?.image} className='h-56 w-full  rounded-[15px]'/></figure>
              <div className="">
                <h2 className="font-semibold pl-1  pt-6">Name : {data.name}</h2>
                <h2 className="font-semibold pl-1 pt-1 pb-3">Email : {data.email}</h2>
              </div>
            </div>
          )}
         

      </div>
    </section>

  

    
   
    </>
  )
}

export default App

