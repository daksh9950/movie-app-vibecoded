import backendAxios from "../../utlis/backendAxios";
import { loginStart, loginSuccess, loginFailure, logoutUserStore, loadUser, setFavorites, addFavorite, removeFavorite, setHistory, addHistoryItem } from "../reducers/Authslice";

// Login specific action
export const asyncLoginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await backendAxios.post("/auth/login", credentials);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    let errorMessage = "Login failed";
    if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    } else if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = error.response.data.errors.map(err => err.msg).join(", ");
    }
    dispatch(loginFailure(errorMessage));
  }
};

// Register specific action 
export const asyncRegisterUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await backendAxios.post("/auth/register", userData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    let errorMessage = "Registration failed";
    if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    } else if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = error.response.data.errors.map(err => err.msg).join(", ");
    }
    dispatch(loginFailure(errorMessage));
  }
};

// Logout
export const asyncLogoutUser = () => (dispatch) => {
  dispatch(logoutUserStore());
};

// Fetch current user details with existing token
export const asyncLoadUser = () => async (dispatch) => {
  try {
    const response = await backendAxios.get("/auth/me");
    dispatch(loadUser(response.data));
    dispatch(asyncFetchFavorites());
    dispatch(asyncFetchHistory());
  } catch (error) {
    dispatch(logoutUserStore());
  }
};

// Favorites Actions
export const asyncFetchFavorites = () => async (dispatch) => {
  try {
    const response = await backendAxios.get("/user/favorites");
    dispatch(setFavorites(response.data.favorites));
  } catch (error) {
    console.error("Failed to fetch favorites", error);
  }
};

export const asyncAddToFavorites = (movieData) => async (dispatch) => {
  try {
    await backendAxios.post("/user/favorites", movieData);
    dispatch(addFavorite(movieData));
  } catch (error) {
    console.error("Failed to add to favorites", error);
  }
};

export const asyncRemoveFromFavorites = (tmdbId) => async (dispatch) => {
  try {
    await backendAxios.delete(`/user/favorites/${tmdbId}`);
    dispatch(removeFavorite(tmdbId));
  } catch (error) {
    console.error("Failed to remove from favorites", error);
  }
};

// History Actions
export const asyncFetchHistory = () => async (dispatch) => {
  try {
    const response = await backendAxios.get("/user/history");
    dispatch(setHistory(response.data.history));
  } catch (error) {
    console.error("Failed to fetch history", error);
  }
};

export const asyncAddToHistory = (itemData) => async (dispatch, getState) => {
  // Only track if user is logged in
  const { isAuthenticated } = getState().auth;
  if (!isAuthenticated) return;
  try {
    const response = await backendAxios.post("/user/history", itemData);
    dispatch(addHistoryItem(itemData));
  } catch (error) {
    // Silently fail — history tracking is non-critical
    console.error("Failed to add to history", error);
  }
};
