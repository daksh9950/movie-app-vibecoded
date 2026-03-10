import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './Topnav';
import axios from "../../utlis/axios"
import Cards from './Cards';
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component"
import Sidenav from './Sidenav';

function Person() {
    document.title = "DSR | PEOPLE"
    const navigate = useNavigate();
    const [person, setperson] = useState([])
    const [pages, setpages] = useState(1);
    const [hasmore, sethasmore] = useState(true)

    const getperson = async () => {
        try {
            const { data } = await axios.get(`/person/popular?page=${pages}`)
            if (data.results.length > 0) {
                setpages(pages + 1)
                setperson((prev) => [...prev, ...data.results])
            } else {
                sethasmore(false);
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const refreshhandler = async () => {
        setpages(1)
        setperson([])
        sethasmore(true)
    }

    useEffect(() => {
        refreshhandler();
    }, [])

    useEffect(() => {
        if (person.length === 0) {
            getperson();
        }
    }, [person])

    return person.length > 0 ? (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-[#1F1E24]'>
            <Sidenav />
            <div id="scrollableDiv" className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
                <Topnav />
                <div className='w-full flex flex-col md:flex-row items-center justify-between px-[3%] py-5 border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300' >
                    <h1 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-400 flex items-center mb-4 md:mb-0 transition-colors duration-300' >
                        <i onClick={() => navigate(-1)} className="mr-3 hover:text-[#6556CD] ri-arrow-left-fill cursor-pointer"></i> 
                        People
                    </h1> 
                </div> 

                <div className='pb-10'>
                    <InfiniteScroll
                        dataLength={person.length}
                        next={getperson}
                        hasMore={hasmore}
                        loader={<h4 className='text-center text-zinc-500 py-5'>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        <Cards data={person} title="person" />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default Person
