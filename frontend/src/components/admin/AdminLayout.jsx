import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogoutUser } from '../../store/actions/authactions';

const navItem = "flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white duration-200 font-medium";
const activeNav = "flex items-center gap-3 p-3 rounded-lg bg-[#6556CD] text-white font-medium";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  return (
    <div className='flex w-screen h-screen bg-zinc-50 dark:bg-[#13121A] transition-colors duration-300'>
      {/* Sidebar */}
      <aside className='w-[220px] h-screen bg-white dark:bg-[#1A1929] flex flex-col flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 transition-colors duration-300'>
        <div className='px-6 py-6 border-b border-zinc-200 dark:border-zinc-800'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-lg bg-[#6556CD] flex items-center justify-center'>
              <i className="ri-shield-fill text-white text-lg"></i>
            </div>
            <div>
              <h1 className='text-zinc-900 dark:text-white font-bold text-sm transition-colors'>DSR Movies</h1>
              <p className='text-xs text-[#6556CD] font-semibold'>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className='flex-1 p-4 flex flex-col gap-1'>
          <p className='text-zinc-400 dark:text-zinc-600 text-xs uppercase tracking-wider mb-2 px-3 transition-colors'>Navigation</p>
          <NavLink to="/admin" end className={({isActive}) => isActive ? activeNav : navItem}>
            <i className="ri-dashboard-fill text-xl"></i> Dashboard
          </NavLink>
          <NavLink to="/admin/movies" className={({isActive}) => isActive ? activeNav : navItem}>
            <i className="ri-movie-2-fill text-xl"></i> Movies
          </NavLink>
          <NavLink to="/admin/users" className={({isActive}) => isActive ? activeNav : navItem}>
            <i className="ri-group-fill text-xl"></i> Users
          </NavLink>
        </nav>

        <div className='p-4 border-t border-zinc-200 dark:border-zinc-800'>
          <div className='flex items-center gap-3 mb-3 px-3'>
            <div className='w-8 h-8 rounded-full bg-[#6556CD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0'>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className='min-w-0'>
              <p className='text-zinc-900 dark:text-white text-sm font-semibold truncate transition-colors'>{user?.name}</p>
              <p className='text-xs text-zinc-500 truncate transition-colors'>{user?.email}</p>
            </div>
          </div>
          <button onClick={() => { dispatch(asyncLogoutUser()); navigate('/'); }} className='w-full flex items-center gap-2 p-3 rounded-lg text-zinc-400 hover:bg-red-900/30 hover:text-red-400 duration-200 text-sm'>
            <i className="ri-logout-box-line text-lg"></i> Logout
          </button>
          <button onClick={() => navigate('/')} className='w-full flex items-center gap-2 p-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white duration-200 text-sm'>
            <i className="ri-arrow-go-back-line text-lg"></i> Back to App
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
