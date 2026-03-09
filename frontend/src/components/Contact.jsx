import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from './TEmplate/Sidenav';
import Topnav from './TEmplate/Topnav';

function Contact() {
    const navigate = useNavigate();
    document.title = "Contact | DSR Movies";
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', message: '' });
    };

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

                    {/* Header */}
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 text-center md:text-left'>
                        <div className='w-20 h-20 rounded-2xl bg-[#6556CD] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#6556CD]/20'>
                            <i className="ri-mail-fill text-white text-4xl"></i>
                        </div>
                        <div>
                            <h1 className='text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2 transition-colors'>Contact Us</h1>
                            <p className='text-zinc-600 dark:text-zinc-400 text-lg md:text-xl transition-colors'>We'd love to hear from you</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14'>
                        {/* Contact Form */}
                        <div className='bg-zinc-50 dark:bg-[#2A2931] p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-xl transition-all'>
                            {sent ? (
                                <div className='flex flex-col items-center justify-center h-full gap-4 py-10'>
                                    <i className="ri-checkbox-circle-fill text-6xl text-green-500"></i>
                                    <h2 className='text-zinc-900 dark:text-white text-2xl font-bold transition-colors'>Message Sent!</h2>
                                    <p className='text-zinc-600 dark:text-zinc-400 text-center transition-colors'>Thanks for reaching out. We'll get back to you soon.</p>
                                    <button onClick={() => setSent(false)} className='mt-8 px-8 py-3 bg-[#6556CD] text-white font-bold rounded-xl hover:bg-[#5244a3] duration-200 shadow-lg shadow-[#6556CD]/20'>
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                                    <h2 className='text-zinc-900 dark:text-white text-2xl font-bold mb-2 transition-colors'>Send a Message</h2>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        className='p-4 rounded-xl bg-white dark:bg-[#1F1E24] text-zinc-800 dark:text-white outline-none border border-zinc-200 dark:border-zinc-700 focus:border-[#6556CD] transition-all duration-200 shadow-sm'
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        autoComplete="email"
                                        className='p-4 rounded-xl bg-white dark:bg-[#1F1E24] text-zinc-800 dark:text-white outline-none border border-zinc-200 dark:border-zinc-700 focus:border-[#6556CD] transition-all duration-200 shadow-sm'
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Your Message"
                                        rows={5}
                                        className='p-4 rounded-xl bg-white dark:bg-[#1F1E24] text-zinc-800 dark:text-white outline-none border border-zinc-200 dark:border-zinc-700 focus:border-[#6556CD] transition-all duration-200 resize-none shadow-sm'
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className='p-4 mt-2 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#6556CD]/20'
                                    >
                                        <i className="ri-send-plane-fill"></i> Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className='flex flex-col gap-6 md:mt-0 mt-2'>
                            <div className='bg-zinc-50 dark:bg-[#2A2931] p-6 rounded-2xl flex items-center gap-5 border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 transition-all'>
                                <div className='w-12 h-12 rounded-full bg-[#6556CD]/10 flex items-center justify-center flex-shrink-0'>
                                    <i className="ri-mail-line text-2xl text-[#6556CD]"></i>
                                </div>
                                <div>
                                    <h3 className='text-zinc-900 dark:text-white font-bold text-lg transition-colors'>Email</h3>
                                    <p className='text-zinc-600 dark:text-zinc-400 transition-colors'>support@dsrmovies.com</p>
                                </div>
                            </div>
                            <div className='bg-zinc-50 dark:bg-[#2A2931] p-6 rounded-2xl flex items-center gap-5 border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 transition-all'>
                                <div className='w-12 h-12 rounded-full bg-[#6556CD]/10 flex items-center justify-center flex-shrink-0'>
                                    <i className="ri-github-fill text-2xl text-[#6556CD]"></i>
                                </div>
                                <div>
                                    <h3 className='text-zinc-900 dark:text-white font-bold text-lg transition-colors'>GitHub</h3>
                                    <p className='text-zinc-600 dark:text-zinc-400 transition-colors'>github.com/DSR-Movies</p>
                                </div>
                            </div>
                            <div className='bg-zinc-50 dark:bg-[#2A2931] p-6 rounded-2xl flex items-center gap-5 border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 transition-all'>
                                <div className='w-12 h-12 rounded-full bg-[#6556CD]/10 flex items-center justify-center flex-shrink-0'>
                                    <i className="ri-twitter-x-fill text-2xl text-[#6556CD]"></i>
                                </div>
                                <div>
                                    <h3 className='text-zinc-900 dark:text-white font-bold text-lg transition-colors'>Twitter / X</h3>
                                    <p className='text-zinc-600 dark:text-zinc-400 transition-colors'>@DSRMovies</p>
                                </div>
                            </div>
                            <div className='bg-zinc-50 dark:bg-[#2A2931] p-6 rounded-2xl flex items-center gap-5 border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 duration-300 transition-all'>
                                <div className='w-12 h-12 rounded-full bg-[#6556CD]/10 flex items-center justify-center flex-shrink-0'>
                                    <i className="ri-time-fill text-2xl text-[#6556CD]"></i>
                                </div>
                                <div>
                                    <h3 className='text-zinc-900 dark:text-white font-bold text-lg transition-colors'>Response Time</h3>
                                    <p className='text-zinc-600 dark:text-zinc-400 transition-colors'>We usually reply within 24–48 hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
