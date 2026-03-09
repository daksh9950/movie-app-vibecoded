import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncFetchAdminMovies } from '../../store/actions/adminactions';
import { asyncFetchAdminUsers } from '../../store/actions/adminactions';

function StatCard({ icon, label, value, color }) {
  return (
    <div className='bg-[#1A1929] rounded-xl p-6 flex items-center gap-5 border border-zinc-800'>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${color}`}>
        <i className={icon}></i>
      </div>
      <div>
        <p className='text-zinc-400 text-sm'>{label}</p>
        <p className='text-white text-3xl font-bold'>{value}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, users } = useSelector(state => state.admin);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    document.title = "Admin Dashboard | DSR Movies";
    dispatch(asyncFetchAdminMovies());
    dispatch(asyncFetchAdminUsers());
  }, []);

  const banned = users.filter(u => u.isBanned).length;

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white'>Welcome back, {user?.name} 👋</h1>
        <p className='text-zinc-400 mt-1'>Here's what's happening on DSR Movies today.</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-3 gap-5 mb-10'>
        <StatCard icon="ri-movie-2-fill" label="Total Custom Movies" value={movies.length} color="bg-[#6556CD]/20 text-[#a99ef5]" />
        <StatCard icon="ri-group-fill" label="Registered Users" value={users.length} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon="ri-shield-cross-fill" label="Banned Users" value={banned} color="bg-red-500/20 text-red-400" />
      </div>

      {/* Quick actions */}
      <h2 className='text-xl font-semibold text-white mb-4'>Quick Actions</h2>
      <div className='grid grid-cols-2 gap-5'>
        <button onClick={() => navigate('/admin/movies')} className='bg-[#1A1929] border border-zinc-800 hover:border-[#6556CD] rounded-xl p-6 text-left duration-200 group'>
          <i className="ri-movie-2-fill text-3xl text-[#6556CD] mb-3 block"></i>
          <h3 className='text-white font-bold text-lg'>Manage Movies</h3>
          <p className='text-zinc-400 text-sm mt-1'>Add, edit, or delete custom movies from the database.</p>
          <span className='text-[#6556CD] text-sm mt-3 flex items-center gap-1 group-hover:gap-2 duration-200'>Go to Movies <i className="ri-arrow-right-line"></i></span>
        </button>
        <button onClick={() => navigate('/admin/users')} className='bg-[#1A1929] border border-zinc-800 hover:border-[#6556CD] rounded-xl p-6 text-left duration-200 group'>
          <i className="ri-group-fill text-3xl text-[#6556CD] mb-3 block"></i>
          <h3 className='text-white font-bold text-lg'>Manage Users</h3>
          <p className='text-zinc-400 text-sm mt-1'>View, ban, or remove registered users from the platform.</p>
          <span className='text-[#6556CD] text-sm mt-3 flex items-center gap-1 group-hover:gap-2 duration-200'>Go to Users <i className="ri-arrow-right-line"></i></span>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
