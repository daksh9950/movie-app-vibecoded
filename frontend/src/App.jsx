import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/TEmplate/Trending'
import Popular from './components/TEmplate/Popular'
import Movies from './components/TEmplate/Movies'
import Tvshows from './components/TEmplate/Tvshows'
import Person from './components/TEmplate/People'
import Moviedetails from "./components/TEmplate/Moviedetails"
import Tvdetails from './components/TEmplate/Tvdetails'
import Persondetails from './components/TEmplate/Persondetails'
import Trailer from './components/TEmplate/Trailer'
import Login from './components/Login'
import Register from './components/Register'
import Favorites from './components/Favorites'
import History from './components/History'
import About from './components/About'
import Contact from './components/Contact'
import AdminRoute from './components/admin/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminMovies from './components/admin/AdminMovies'
import AdminUsers from './components/admin/AdminUsers'
import { useDispatch } from 'react-redux'
import { asyncLoadUser } from './store/actions/authactions'

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncLoadUser());
  }, [dispatch]);

  return (
    
    <div className='w-screen h-screen bg-[#1F1E24] flex ' >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/trending' element={<Trending/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movie' element={<Movies/>} />
        <Route
               path='/movie/details/:id'
               element={<Moviedetails/>} 
            >
              <Route 
              path='trailer'
               element={<Trailer/>}  /> 
            </Route>
            

           
        
        <Route path='/tv' element={<Tvshows/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/history' element={<History/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        {/* Admin Panel - protected */}
        <Route path='/admin' element={<AdminRoute/>}>
          <Route element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>} />
            <Route path='movies' element={<AdminMovies/>} />
            <Route path='users' element={<AdminUsers/>} />
          </Route>
        </Route>
        <Route
               path='/tv/details/:id'
               element={<Tvdetails/>} 
            >
               <Route 
              path='trailer'
               element={<Trailer/>}  /> 
            </Route>
             
        
        <Route path='/person' element={<Person/>} />
        <Route
               path='/person/details/:id'
               element={<Persondetails/>} 
            />

        <Route path="/tv/detail/:id/trailer" element={<Trailer />} />    
           
        
      </Routes>
    </div>
  )
}

export default App
