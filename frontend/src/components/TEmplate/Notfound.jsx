import React from 'react'
import notfoundimg from "../../assets/404.gif"
import { Link, useNavigate } from 'react-router-dom'
function Notfound() {
    const navigate = useNavigate()
    return (
       
         <div className='w-screen h-screen flex itmes-center justify-center bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0  ' >
             <Link 
                   onClick={()=>navigate(-1)}  
                   className="mr-2 text-xl hover:text-[#6001D2] ri-arrow-left-fill text-white right-[5%] top-[5%] absolute   " >
            </Link>
           
                <img className=' absolute object-cover w-[70%] h-[70%] top-[15%] ' src={notfoundimg} alt="" />
           
        </div>
    )
}

export default Notfound
