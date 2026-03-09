import backendAxios from "../../utlis/backendAxios";
import { setMovies, addMovie, updateMovie, removeMovie, setUsers, banUser, removeUser, setAdminStatus, setAdminError } from "../reducers/AdminSlice";

// ─── Movies ────────────────────────────────────────────
export const asyncFetchAdminMovies = () => async (dispatch) => {
  dispatch(setAdminStatus("loading"));
  try {
    const { data } = await backendAxios.get("/movies");
    dispatch(setMovies(data.items));
    dispatch(setAdminStatus("succeeded"));
  } catch (e) {
    dispatch(setAdminError(e.response?.data?.message || "Failed to fetch movies"));
    dispatch(setAdminStatus("failed"));
  }
};

export const asyncAddMovie = (movieData) => async (dispatch) => {
  try {
    const { data } = await backendAxios.post("/movies", movieData);
    dispatch(addMovie(data));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.response?.data?.message || "Failed to add movie" };
  }
};

export const asyncUpdateMovie = (id, movieData) => async (dispatch) => {
  try {
    const { data } = await backendAxios.put(`/movies/${id}`, movieData);
    dispatch(updateMovie(data));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.response?.data?.message || "Failed to update movie" };
  }
};

export const asyncDeleteMovie = (id) => async (dispatch) => {
  try {
    await backendAxios.delete(`/movies/${id}`);
    dispatch(removeMovie(id));
  } catch (e) {
    console.error("Failed to delete movie", e);
  }
};

// ─── Users ────────────────────────────────────────────
export const asyncFetchAdminUsers = () => async (dispatch) => {
  dispatch(setAdminStatus("loading"));
  try {
    const { data } = await backendAxios.get("/user/admin/users");
    dispatch(setUsers(data.users));
    dispatch(setAdminStatus("succeeded"));
  } catch (e) {
    dispatch(setAdminError(e.response?.data?.message || "Failed to fetch users"));
    dispatch(setAdminStatus("failed"));
  }
};

export const asyncBanUser = (id) => async (dispatch) => {
  try {
    await backendAxios.patch(`/user/admin/users/${id}/ban`);
    dispatch(banUser(id));
  } catch (e) {
    console.error("Failed to ban user", e);
  }
};

export const asyncDeleteUser = (id) => async (dispatch) => {
  try {
    await backendAxios.delete(`/user/admin/users/${id}`);
    dispatch(removeUser(id));
  } catch (e) {
    console.error("Failed to delete user", e);
  }
};
