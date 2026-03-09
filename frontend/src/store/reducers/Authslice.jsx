import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
  favorites: [],
  history: [],
  watchlist: [],
  ratings: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutUserStore(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      localStorage.removeItem("token");
    },
    loadUser(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    setFavorites(state, action) {
        state.favorites = action.payload;
    },
    addFavorite(state, action) {
        state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
        state.favorites = state.favorites.filter(fav => fav.tmdbId !== action.payload);
    },
    setHistory(state, action) {
        state.history = action.payload;
    },
    addHistoryItem(state, action) {
        // Keep most recent first, cap at 50
        state.history = [action.payload, ...state.history.filter(h => !(h.tmdbId === action.payload.tmdbId && h.action === action.payload.action))].slice(0, 50);
    },
    setWatchlist(state, action) {
        state.watchlist = action.payload;
    },
    addToWatchlist(state, action) {
        state.watchlist.push(action.payload);
    },
    removeFromWatchlist(state, action) {
        state.watchlist = state.watchlist.filter(item => item.tmdbId !== action.payload);
    },
    setRatings(state, action) {
        state.ratings = action.payload;
    },
    addRating(state, action) {
        const index = state.ratings.findIndex(r => r.tmdbId === action.payload.tmdbId);
        if (index !== -1) {
            state.ratings[index] = action.payload;
        } else {
            state.ratings.push(action.payload);
        }
    }
  },
});

export const { 
    loginStart, loginSuccess, loginFailure, logoutUserStore, loadUser, 
    setFavorites, addFavorite, removeFavorite, 
    setHistory, addHistoryItem,
    setWatchlist, addToWatchlist, removeFromWatchlist,
    setRatings, addRating
} = authSlice.actions;

export default authSlice.reducer;
