import  movieReducer  from './reducers/Moveslice'
import  personReducer  from './reducers/personslice'
import  tvReducer  from './reducers/Tvslice'
import  authReducer   from './reducers/Authslice'
import  adminReducer  from './reducers/AdminSlice'
import  uiReducer  from './reducers/UISlice'

import { configureStore } from '@reduxjs/toolkit'

export const  store = configureStore({
  reducer: {
       movie : movieReducer, 
       tv: tvReducer, 
       person : personReducer,
       auth: authReducer,
       admin: adminReducer,
       ui: uiReducer,
  },
  devTools: true 
})
