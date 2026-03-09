import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchAdminMovies, asyncAddMovie, asyncUpdateMovie, asyncDeleteMovie } from '../../store/actions/adminactions';

const emptyForm = { title: '', genre: '', category: '', releaseDate: '', description: '', posterImageUrl: '', trailerYoutubeLink: '', tmdbId: '' };

function MovieModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = await onSave(form);
    setSaving(false);
    if (result?.success === false) { setError(result.error); }
    else { onClose(); }
  };

  const field = (name, label, type = 'text', full = false) => (
    <div className={full ? 'col-span-2' : ''}>
      <label className='text-zinc-400 text-sm block mb-1'>{label}</label>
      {name === 'description' ? (
        <textarea name={name} value={form[name]} onChange={handleChange} rows={3} className='w-full p-3 rounded-lg bg-[#13121A] text-white border border-zinc-700 focus:border-[#6556CD] outline-none resize-none text-sm' />
      ) : (
        <input type={type} name={name} value={form[name]} onChange={handleChange} className='w-full p-3 rounded-lg bg-[#13121A] text-white border border-zinc-700 focus:border-[#6556CD] outline-none text-sm' />
      )}
    </div>
  );

  return (
    <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'>
      <div className='bg-[#1A1929] rounded-2xl w-full max-w-lg p-8 border border-zinc-800 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-white text-xl font-bold'>{initial ? 'Edit Movie' : 'Add New Movie'}</h2>
          <button onClick={onClose} className='text-zinc-400 hover:text-white text-2xl'><i className="ri-close-line"></i></button>
        </div>
        {error && <p className='text-red-400 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
          {field('title', 'Title *', 'text', true)}
          {field('genre', 'Genre')}
          {field('category', 'Category')}
          {field('releaseDate', 'Release Date')}
          {field('tmdbId', 'TMDB ID')}
          {field('posterImageUrl', 'Poster Image URL', 'text', true)}
          {field('trailerYoutubeLink', 'Trailer YouTube Link', 'text', true)}
          {field('description', 'Description', 'text', true)}
          <div className='col-span-2 flex gap-3 pt-2'>
            <button type='submit' disabled={saving} className='flex-1 p-3 bg-[#6556CD] hover:bg-[#5244a3] text-white font-semibold rounded-lg duration-200 disabled:opacity-50'>
              {saving ? 'Saving...' : (initial ? 'Update Movie' : 'Add Movie')}
            </button>
            <button type='button' onClick={onClose} className='px-6 p-3 border border-zinc-700 text-zinc-400 hover:text-white rounded-lg duration-200'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminMovies() {
  const dispatch = useDispatch();
  const { movies, status } = useSelector(state => state.admin);
  const [modal, setModal] = useState(null); // null | 'add' | movie object
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    document.title = "Movies | Admin";
    dispatch(asyncFetchAdminMovies());
  }, []);

  const handleSave = async (form) => {
    if (modal && modal._id) return dispatch(asyncUpdateMovie(modal._id, form));
    return dispatch(asyncAddMovie(form));
  };

  const handleDelete = async (id) => {
    await dispatch(asyncDeleteMovie(id));
    setConfirmDelete(null);
  };

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Movies</h1>
          <p className='text-zinc-400 text-sm'>{movies.length} custom movies in database</p>
        </div>
        <button onClick={() => setModal('add')} className='flex items-center gap-2 px-4 py-2.5 bg-[#6556CD] hover:bg-[#5244a3] text-white rounded-lg font-semibold duration-200'>
          <i className="ri-add-line text-lg"></i> Add Movie
        </button>
      </div>

      {status === 'loading' ? (
        <div className='flex justify-center py-20'><div className='w-10 h-10 rounded-full border-2 border-[#6556CD] border-t-transparent animate-spin'></div></div>
      ) : movies.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-zinc-600'>
          <i className="ri-movie-2-line text-6xl mb-4"></i>
          <p className='text-lg'>No custom movies yet. Click "Add Movie" to create one.</p>
        </div>
      ) : (
        <div className='bg-[#1A1929] rounded-2xl border border-zinc-800 overflow-hidden'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider'>
                <th className='p-4 text-left'>Title</th>
                <th className='p-4 text-left'>Genre</th>
                <th className='p-4 text-left'>Category</th>
                <th className='p-4 text-left'>Release</th>
                <th className='p-4 text-left'>TMDB ID</th>
                <th className='p-4 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m, i) => (
                <tr key={m._id} className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 duration-150 ${i % 2 === 0 ? '' : 'bg-zinc-900/20'}`}>
                  <td className='p-4 font-semibold text-white max-w-[160px] truncate'>{m.title}</td>
                  <td className='p-4 text-zinc-400'>{m.genre || '—'}</td>
                  <td className='p-4 text-zinc-400'>{m.category || '—'}</td>
                  <td className='p-4 text-zinc-400'>{m.releaseDate || '—'}</td>
                  <td className='p-4 text-zinc-400'>{m.tmdbId || '—'}</td>
                  <td className='p-4 text-right'>
                    <button onClick={() => setModal(m)} className='mr-2 p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 duration-200'><i className="ri-edit-line text-lg"></i></button>
                    <button onClick={() => setConfirmDelete(m)} className='p-2 rounded-lg text-red-400 hover:bg-red-500/20 duration-200'><i className="ri-delete-bin-line text-lg"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <MovieModal
          initial={modal !== 'add' ? modal : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'>
          <div className='bg-[#1A1929] rounded-2xl p-8 border border-zinc-800 max-w-sm w-full text-center'>
            <i className="ri-delete-bin-fill text-5xl text-red-400 mb-4 block"></i>
            <h3 className='text-white text-lg font-bold mb-2'>Delete Movie?</h3>
            <p className='text-zinc-400 mb-6'>Are you sure you want to delete <span className='text-white font-semibold'>"{confirmDelete.title}"</span>? This action cannot be undone.</p>
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

export default AdminMovies;
