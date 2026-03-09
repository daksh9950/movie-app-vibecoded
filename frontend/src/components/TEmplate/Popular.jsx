import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utlis/axios';
import Topnav from './Topnav';
import Dropdown from './Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loader from './Loader';
import Sidenav from './Sidenav';

function Popular() {
    document.title = "DSR | POPULAR"
    const navigate = useNavigate();
    const [popular, setpopular] = useState([])
    const [category, setcategory] = useState("movie")
    const [pages, setpages] = useState(1);
    const [hasmore, sethasmore] = useState(true)

    const getpopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${pages}`)
            if (data.results.length > 0) {
                setpages(pages + 1)
                setpopular((prev) => [...prev, ...data.results])
            } else {
                sethasmore(false);
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const refreshhandler = async () => {
        setpages(1)
        setpopular([])
        sethasmore(true)
    }

    useEffect(() => {
        refreshhandler();
    }, [category])

    useEffect(() => {
        if (popular.length === 0) {
            getpopular();
        }
    }, [popular])

    return popular.length > 0 ? (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
            <Sidenav />
            <div id="scrollableDiv" className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
                <div className='w-full flex flex-col md:flex-row items-center justify-between px-[3%] py-5 border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300' >
                    <h1 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-400 flex items-center mb-4 md:mb-0 transition-colors duration-300' >
                        <i onClick={() => navigate(-1)} className="mr-3 hover:text-[#6556CD] ri-arrow-left-fill cursor-pointer"></i> 
                        Popular
                    </h1> 

                    <div className='flex items-center gap-2 w-full md:w-[70%]' >
                        <Topnav />
                        <div className='hidden md:flex items-center gap-2 ml-4'>
                            <Dropdown
                                title="Category"
                                options={["movie", "tv"]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>
                    </div> 

                    {/* Mobile Filters */}
                    <div className='flex md:hidden items-center justify-start w-full mt-4'>
                        <Dropdown
                            title="Category"
                            options={["movie", "tv"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>
                </div>

                <div className='pb-10'>
                    <InfiniteScroll
                        dataLength={popular.length}
                        next={getpopular}
                        hasMore={hasmore}
                        loader={<h4 className='text-center text-zinc-500 py-5'>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        <Cards data={popular} title={category} />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default Popular
