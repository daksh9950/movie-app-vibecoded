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
        // Show success message (form is UI-only)
        setSent(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className='flex w-screen h-screen bg-[#1F1E24]'>
            <Sidenav />
            <div className='w-[80%] h-full flex flex-col'>
                <Topnav />
                <div className='flex-1 overflow-y-auto px-[8%] py-10'>

                    <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-zinc-400 hover:text-[#6556CD] duration-200 mb-8'>
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span>Back</span>
                    </button>

                    {/* Header */}
                    <div className='flex items-center gap-5 mb-10'>
                        <div className='w-16 h-16 rounded-2xl bg-[#6556CD] flex items-center justify-center flex-shrink-0'>
                            <i className="ri-mail-fill text-white text-3xl"></i>
                        </div>
                        <div>
                            <h1 className='text-4xl font-black text-white'>Contact Us</h1>
                            <p className='text-zinc-400 text-lg'>We'd love to hear from you</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-10'>
                        {/* Contact Form */}
                        <div className='bg-[#2A2931] p-8 rounded-xl'>
                            {sent ? (
                                <div className='flex flex-col items-center justify-center h-full gap-4 py-10'>
                                    <i className="ri-checkbox-circle-fill text-6xl text-green-500"></i>
                                    <h2 className='text-white text-2xl font-bold'>Message Sent!</h2>
                                    <p className='text-zinc-400 text-center'>Thanks for reaching out. We'll get back to you soon.</p>
                                    <button onClick={() => setSent(false)} className='mt-4 px-6 py-2 bg-[#6556CD] text-white rounded-lg hover:bg-[#5244a3] duration-200'>
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                    <h2 className='text-white text-xl font-bold mb-2'>Send a Message</h2>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        className='p-3 rounded-lg bg-[#1F1E24] text-white outline-none border border-zinc-700 focus:border-[#6556CD] duration-200'
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        autoComplete="email"
                                        className='p-3 rounded-lg bg-[#1F1E24] text-white outline-none border border-zinc-700 focus:border-[#6556CD] duration-200'
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Your Message"
                                        rows={5}
                                        className='p-3 rounded-lg bg-[#1F1E24] text-white outline-none border border-zinc-700 focus:border-[#6556CD] duration-200 resize-none'
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className='p-3 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-semibold rounded-lg flex items-center justify-center gap-2'
                                    >
                                        <i className="ri-send-plane-fill"></i> Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className='flex flex-col gap-5'>
                            <div className='bg-[#2A2931] p-6 rounded-xl flex items-start gap-4'>
                                <i className="ri-mail-line text-2xl text-[#6556CD] flex-shrink-0 mt-1"></i>
                                <div>
                                    <h3 className='text-white font-semibold text-lg'>Email</h3>
                                    <p className='text-zinc-400'>support@dsrmovies.com</p>
                                </div>
                            </div>
                            <div className='bg-[#2A2931] p-6 rounded-xl flex items-start gap-4'>
                                <i className="ri-github-fill text-2xl text-[#6556CD] flex-shrink-0 mt-1"></i>
                                <div>
                                    <h3 className='text-white font-semibold text-lg'>GitHub</h3>
                                    <p className='text-zinc-400'>github.com/DSR-Movies</p>
                                </div>
                            </div>
                            <div className='bg-[#2A2931] p-6 rounded-xl flex items-start gap-4'>
                                <i className="ri-twitter-x-fill text-2xl text-[#6556CD] flex-shrink-0 mt-1"></i>
                                <div>
                                    <h3 className='text-white font-semibold text-lg'>Twitter / X</h3>
                                    <p className='text-zinc-400'>@DSRMovies</p>
                                </div>
                            </div>
                            <div className='bg-[#2A2931] p-6 rounded-xl flex items-start gap-4'>
                                <i className="ri-time-fill text-2xl text-[#6556CD] flex-shrink-0 mt-1"></i>
                                <div>
                                    <h3 className='text-white font-semibold text-lg'>Response Time</h3>
                                    <p className='text-zinc-400'>We usually reply within 24–48 hours.</p>
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
