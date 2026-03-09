import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../store/actions/authactions';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecretCode, setAdminSecretCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(asyncRegisterUser({ name, email, password, adminSecretCode }));
    }
  };

  return (
    <div className='w-screen min-h-screen bg-[#1F1E24] flex justify-center items-center py-10'>
      <div className='w-[90%] md:w-[400px] bg-[#2A2931] p-10 rounded-lg shadow-lg'>
        <h1 className='text-3xl text-white font-bold mb-5 flex items-center justify-center gap-2'>
          <i className="text-[#6556CD] ri-tv-fill"></i> DSR Register
        </h1>
        {error && <p className='text-red-500 mb-4 text-center text-sm'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Full Name"
            className='p-3 rounded bg-[#1F1E24] text-white outline-none border border-zinc-600 focus:border-[#6556CD]'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className='p-3 rounded bg-[#1F1E24] text-white outline-none border border-zinc-600 focus:border-[#6556CD]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (Min 6 chars)"
            className='p-3 rounded bg-[#1F1E24] text-white outline-none border border-zinc-600 focus:border-[#6556CD]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <input
            type="text"
            placeholder="Admin Secret Code (Optional)"
            className='p-3 rounded bg-[#1F1E24] text-white outline-none border border-zinc-600 focus:border-[#6556CD]'
            value={adminSecretCode}
            onChange={(e) => setAdminSecretCode(e.target.value)}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className='mt-5 p-3 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-semibold rounded disabled:opacity-50'
          >
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className='text-zinc-400 mt-5 text-center'>
          Already have an account? <Link to="/login" className='text-[#6556CD] hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
