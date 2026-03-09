import React, { useEffect, useState } from 'react'
import Sidenav from './TEmplate/Sidenav'
import Topnav from './TEmplate/Topnav'
import axios from "../utlis/axios"
import Header from './TEmplate/Header'
import HorizontalCards from './TEmplate/HorizontalCards'
import Dropdown from './TEmplate/Dropdown'
import Loader from './TEmplate/Loader'

function Home() {
     document.title = "The Movie App"
     const [wallpaper, setwallpaper] = useState([]);
     const [trending, settrending] = useState([])
     const [category, setcategory] = useState("all")

     const GetHeaderWallpaper = async ()=>{
            try {
            const {data} = await axios.get(`/trending/all/day`)
           
            let random = data.results[(Math.random()*data.results.length + 1).toFixed()];
            setwallpaper(random);
             
        } catch (error) {
            console.log("ERROR", error)
            
        }
     }

     const gettrending = async ()=>{
            try {
            const {data} = await axios.get(`/trending/${category}/day`)
            console.log(data)
           
            settrending(data.results);
             
        } catch (error) {
            console.log("ERROR", error)
            
        }
     }


     useEffect(()=>{
           gettrending();
          GetHeaderWallpaper();
           
     },[category])
     


    return wallpaper && trending ? (
       <div className='w-full h-full flex flex-col md:flex-row overflow-hidden'>
         <Sidenav/>
         <div className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300' >
          <Topnav/>
          <Header data={wallpaper} />
            <div className='flex justify-between items-center p-5 border-b border-zinc-100 dark:border-zinc-800' >
              <h1 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-300 transition-colors duration-300' >Trending</h1>

              <Dropdown 
               title="Filter"
               options={["tv", "movies", "all"]}
               func={(e)=>(setcategory(e.target.value.toLowerCase()))}  />

           </div>
            <HorizontalCards data={trending} />
         </div>
       </div>
    ):(
      <Loader/>
    )
}

export default Home
