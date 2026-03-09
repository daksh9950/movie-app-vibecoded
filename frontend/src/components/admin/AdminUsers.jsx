import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchAdminUsers, asyncBanUser, asyncDeleteUser } from '../../store/actions/adminactions';

function AdminUsers() {
  const dispatch = useDispatch();
  const { users, status } = useSelector(state => state.admin);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState('');
  const { user: currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    document.title = "Users | Admin";
    dispatch(asyncFetchAdminUsers());
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    await dispatch(asyncDeleteUser(id));
    setConfirmDelete(null);
  };

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Users</h1>
          <p className='text-zinc-400 text-sm'>{users.length} registered users</p>
        </div>
        <div className='flex items-center gap-3 bg-[#1A1929] border border-zinc-800 rounded-lg px-4 py-2.5'>
          <i className="ri-search-line text-zinc-400"></i>
          <input
            type="text"
            placeholder="Search users..."
            className='bg-transparent text-white outline-none text-sm w-48 placeholder-zinc-600'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {status === 'loading' ? (
        <div className='flex justify-center py-20'><div className='w-10 h-10 rounded-full border-2 border-[#6556CD] border-t-transparent animate-spin'></div></div>
      ) : (
        <div className='bg-[#1A1929] rounded-2xl border border-zinc-800 overflow-hidden'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider'>
                <th className='p-4 text-left'>User</th>
                <th className='p-4 text-left'>Email</th>
                <th className='p-4 text-left'>Role</th>
                <th className='p-4 text-left'>Status</th>
                <th className='p-4 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u._id} className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 duration-150 ${i % 2 === 0 ? '' : 'bg-zinc-900/20'}`}>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-[#6556CD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0'>
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span className='text-white font-semibold'>{u.name}</span>
                    </div>
                  </td>
                  <td className='p-4 text-zinc-400'>{u.email}</td>
                  <td className='p-4'>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${u.role === 'admin' ? 'bg-[#6556CD]/20 text-[#a99ef5]' : 'bg-zinc-800 text-zinc-400'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${u.isBanned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {u.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className='p-4 text-right'>
                    {u._id !== currentUser?._id && u.role !== 'admin' && (
                      <>
                        {!u.isBanned && (
                          <button
                            onClick={() => dispatch(asyncBanUser(u._id))}
                            title="Ban User"
                            className='mr-2 p-2 rounded-lg text-yellow-400 hover:bg-yellow-500/20 duration-200'
                          >
                            <i className="ri-shield-cross-line text-lg"></i>
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmDelete(u)}
                          title="Delete User"
                          className='p-2 rounded-lg text-red-400 hover:bg-red-500/20 duration-200'
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </>
                    )}
                    {u._id === currentUser?._id && (
                      <span className='text-xs text-zinc-600 italic'>You</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className='p-8 text-center text-zinc-600'>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'>
          <div className='bg-[#1A1929] rounded-2xl p-8 border border-zinc-800 max-w-sm w-full text-center'>
            <i className="ri-user-unfollow-fill text-5xl text-red-400 mb-4 block"></i>
            <h3 className='text-white text-lg font-bold mb-2'>Delete User?</h3>
            <p className='text-zinc-400 mb-6'>Permanently delete <span className='text-white font-semibold'>"{confirmDelete.name}"</span>? All their data will be lost.</p>
            <div className='flex gap-3'>
              <button onClick={() => handleDelete(confirmDelete._id)} className='flex-1 p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg duration-200'>Delete</button>
              <button onClick={() => setConfirmDelete(null)} className='flex-1 p-3 border border-zinc-700 text-zinc-400 hover:text-white rounded-lg duration-200'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
