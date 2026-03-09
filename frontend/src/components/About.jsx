import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from './TEmplate/Sidenav';
import Topnav from './TEmplate/Topnav';

function About() {
    const navigate = useNavigate();
    document.title = "About | DSR Movies";

    return (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
            <Sidenav />
            <div className='w-full md:w-[80%] h-full flex flex-col overflow-auto overflow-x-hidden transition-colors duration-300'>
                <Topnav />
                <div className='flex-1 px-[5%] md:px-[8%] py-10 pb-20'>

                    <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-[#6556CD] duration-200 mb-8 transition-colors'>
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span>Back</span>
                    </button>

                    {/* Hero */}
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 text-center md:text-left'>
                        <div className='w-20 h-20 rounded-2xl bg-[#6556CD] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#6556CD]/20'>
                            <i className="ri-tv-fill text-white text-4xl"></i>
                        </div>
                        <div>
                            <h1 className='text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2 transition-colors'>DSR Movies</h1>
                            <p className='text-zinc-600 dark:text-zinc-400 text-lg md:text-xl transition-colors'>Your ultimate movie discovery platform</p>
                        </div>
                    </div>

                    {/* About cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                        <div className='bg-zinc-50 dark:bg-[#2A2931] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 group transition-all'>
                            <i className="ri-movie-2-fill text-4xl text-[#6556CD] mb-4 block group-hover:scale-110 duration-300"></i>
                            <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-3 transition-colors'>Vast Movie Database</h2>
                            <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors'>Browse thousands of movies, TV shows, and celebrities powered by The Movie Database (TMDB) API — always up to date and feature-rich.</p>
                        </div>
                        
                        <div className='bg-zinc-50 dark:bg-[#2A2931] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 group transition-all'>
                            <i className="ri-heart-3-fill text-4xl text-[#6556CD] mb-4 block group-hover:scale-110 duration-300"></i>
                            <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-3 transition-colors'>Personalised Favorites</h2>
                            <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors'>Save movies and shows you love to your Favorites list, stored securely in the cloud so they're available on any device, anytime.</p>
                        </div>
                        
                        <div className='bg-zinc-50 dark:bg-[#2A2931] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 group transition-all'>
                            <i className="ri-history-fill text-4xl text-[#6556CD] mb-4 block group-hover:scale-110 duration-300"></i>
                            <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-3 transition-colors'>Watch History</h2>
                            <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors'>Automatically track every movie you open or trailer you watch. Pick up right where you left off, and never lose track of a great find.</p>
                        </div>
                        
                        <div className='bg-zinc-50 dark:bg-[#2A2931] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 group transition-all'>
                            <i className="ri-lock-fill text-4xl text-[#6556CD] mb-4 block group-hover:scale-110 duration-300"></i>
                            <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-3 transition-colors'>Secure Cloud</h2>
                            <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors'>JWT-based authentication and MongoDB storage keep your data safe and synchronized across all your browser instances.</p>
                        </div>
                    </div>

                    {/* Tech stack */}
                    <div className='bg-zinc-50 dark:bg-[#2A2931] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 mb-12 shadow-md dark:shadow-xl transition-all'>
                        <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-6 flex items-center gap-2 transition-colors'>
                            <i className="ri-stack-line text-[#6556CD]"></i>
                            Built With
                        </h2>
                        <div className='flex flex-wrap gap-3'>
                            {['React 19', 'Redux Toolkit', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'TMDB API', 'Vite'].map(tech => (
                                <span key={tech} className='px-4 py-2 rounded-xl bg-[#6556CD]/10 text-[#a99ef5] border border-[#6556CD]/20 text-sm font-semibold hover:bg-[#6556CD]/20 hover:border-[#6556CD]/40 duration-200 cursor-default'>{tech}</span>
                            ))}
                        </div>
                    </div>

                    <p className='text-zinc-500 text-center text-sm'>© {new Date().getFullYear()} DSR Movies. Designed for the ultimate cinematic experience.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
