import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './Topnav';
import Dropdown from './Dropdown';
import axios from "../../utlis/axios"
import Cards from './Cards';
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component"
import Sidenav from './Sidenav';

function Tvshows() {
    document.title = "DSR | TV SHOWS"
    const navigate = useNavigate();
    const [tv, settv] = useState([])
    const [category, setcategory] = useState("airing_today")
    const [genres, setgenres] = useState([])
    const [selectedGenre, setselectedGenre] = useState("0")
    const [pages, setpages] = useState(1);
    const [hasmore, sethasmore] = useState(true)

    const getgenres = async () => {
        try {
            const { data } = await axios.get(`/genre/tv/list`);
            const formattedGenres = data.genres.map(g => ({ label: g.name, value: g.id.toString() }));
            setgenres(formattedGenres);
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    const gettv = async () => {
        try {
            let url = `/tv/${category}?page=${pages}`;
            if (selectedGenre !== "0") {
                url = `/discover/tv?with_genres=${selectedGenre}&page=${pages}&sort_by=popularity.desc`;
            }
            const { data } = await axios.get(url)
            if (data.results.length > 0) {
                setpages(pages + 1)
                settv((prev) => [...prev, ...data.results])
            } else {
                sethasmore(false);
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const refreshhandler = async () => {
        setpages(1)
        settv([])
        sethasmore(true)
    }

    useEffect(() => {
        getgenres();
    }, [])

    useEffect(() => {
        refreshhandler();
    }, [category, selectedGenre])

    useEffect(() => {
        if (tv.length === 0) {
            gettv();
        }
    }, [tv])

    return tv.length > 0 ? (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
            <Sidenav />
            <div id="scrollableDiv" className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
                <div className='w-full flex flex-col md:flex-row items-center justify-between px-[3%] py-5 border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300' >
                    <h1 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-400 flex items-center mb-4 md:mb-0 transition-colors duration-300' >
                        <i onClick={() => navigate(-1)} className="mr-3 hover:text-[#6556CD] ri-arrow-left-fill cursor-pointer"></i> 
                        TV Shows
                    </h1> 

                    <div className='flex items-center gap-2 w-full md:w-[70%]' >
                        <Topnav />
                        <div className='hidden md:flex items-center gap-2 ml-4'>
                            <Dropdown
                                title="Category"
                                options={["popular", "top_rated", "on_the_air", "airing_today"]}
                                func={(e) => {
                                    setcategory(e.target.value);
                                    setselectedGenre("0");
                                }}
                            />
                            <Dropdown
                                title="Genre"
                                options={genres}
                                func={(e) => setselectedGenre(e.target.value)}
                            />
                        </div>
                    </div> 

                    {/* Mobile Filters */}
                    <div className='flex md:hidden items-center justify-between w-full mt-4 gap-2'>
                        <Dropdown
                            title="Category"
                            options={["popular", "top_rated", "on_the_air", "airing_today"]}
                            func={(e) => {
                                setcategory(e.target.value);
                                setselectedGenre("0");
                            }}
                        />
                        <Dropdown
                            title="Genre"
                            options={genres}
                            func={(e) => setselectedGenre(e.target.value)}
                        />
                    </div>
                </div>

                <div className='pb-10'>
                    <InfiniteScroll
                        dataLength={tv.length}
                        next={gettv}
                        hasMore={hasmore}
                        loader={<h4 className='text-center text-zinc-500 py-5'>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        <Cards data={tv} title="tv" />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default Tvshows
