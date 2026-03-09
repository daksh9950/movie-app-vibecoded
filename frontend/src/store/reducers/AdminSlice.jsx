import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  users: [],
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setMovies(state, action) { state.movies = action.payload; },
    addMovie(state, action) { state.movies.unshift(action.payload); },
    updateMovie(state, action) {
      const idx = state.movies.findIndex(m => m._id === action.payload._id);
      if (idx !== -1) state.movies[idx] = action.payload;
    },
    removeMovie(state, action) {
      state.movies = state.movies.filter(m => m._id !== action.payload);
    },
    setUsers(state, action) { state.users = action.payload; },
    banUser(state, action) {
      const u = state.users.find(u => u._id === action.payload);
      if (u) u.isBanned = true;
    },
    removeUser(state, action) {
      state.users = state.users.filter(u => u._id !== action.payload);
    },
    setAdminStatus(state, action) { state.status = action.payload; },
    setAdminError(state, action) { state.error = action.payload; },
  },
});

export const { setMovies, addMovie, updateMovie, removeMovie, setUsers, banUser, removeUser, setAdminStatus, setAdminError } = adminSlice.actions;
export default adminSlice.reducer;
