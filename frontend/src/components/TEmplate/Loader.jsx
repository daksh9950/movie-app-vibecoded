import React from 'react'
import loader from "../../assets/loader.webp"
function Loader() {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-[#0E1218]' >
            
            <img className='object-cover w-[30%] h-[40%] ' src={loader} alt="" />
        </div>
        
    )
}

export default Loader
