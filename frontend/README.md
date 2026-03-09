<<<<<<< HEAD


# 🎬 Dsr Movie App

A modern React.js web app that fetches and displays trending movies and TV shows using the TMDb API.

## 🔧 Features
- Browse trending Movies and TV shows
- Filter by category
- View poster, title, and overview
- Responsive UI with Tailwind CSS

## 🛠️ Tech Stack
- React.js
- Axios
- Tailwind CSS
- TMDb API

## 📦 Installation

```bash
git clone https://github.com/yourusername/movie-app.git
cd movie-app
npm install
npm start

=======
# DSR-MOVIES-APP
>>>>>>> 8d3ba0b441d549bf3583f06fa9b18dfeafe58c07

src/
│
├── components/
│ ├── Home.jsx
│ ├── TEmplate/
│ │ ├── Trending.jsx
│ │ ├── Popular.jsx
│ │ ├── Movies.jsx
│ │ ├── Tvshows.jsx
│ │ ├── People.jsx
│ │ ├── Moviedetails.jsx
│ │ ├── Tvdetails.jsx
│ │ ├── Persondetails.jsx
│ │ └── Trailer.jsx
│
├── redux/
│ ├── store.js
│ ├── movieSlice.js
│ ├── tvSlice.js
│ └── personSlice.js
│
├── App.jsx
└── index.js

csharp
Copy
Edit

## 🧠 State Management (Redux)

Each media type (movie, tv, person) has its own slice, with basic actions:

```js
// Example from movieSlice.js
loadmovie: (state, action) => {
  state.info = action.payload;
},
removemovie: (state) => {
  state.info = null;
}
Access in components like this:

js
Copy
Edit
const movieInfo = useSelector((state) => state.movie.info);
📺 Trailer Playback
Trailer video is loaded using ReactPlayer and the YouTube video key from the API:

js
Copy
Edit
<ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />
Ensure the video data is correctly dispatched and available in Redux state before rendering.

🛠 Technologies Used
React

Redux Toolkit

React Router DOM

React Player

Tailwind CSS

# Components Overview

## Main Components

- **[`App`](src/App.jsx)**  
  Main entry point for routing. Sets up all routes for Home, Trending, Popular, Movies, TV Shows, People, and detail pages.

- **[`Home`](src/components/Home.jsx)**  
  Displays the main landing page with a trending header, trending cards, and a filter dropdown.

## Template Components

- **[`Trending`](src/components/TEmplate/Trending.jsx)**  
  Shows trending movies, TV shows, or both, with infinite scroll and filter options.

- **[`Popular`](src/components/TEmplate/Popular.jsx)**  
  Lists popular movies or TV shows with infinite scroll and category filter.

- **[`Movies`](src/components/TEmplate/Movies.jsx)**  
  Displays movies by category (popular, top rated, upcoming, now playing) with infinite scroll.

- **[`Tvshows`](src/components/TEmplate/Tvshows.jsx)**  
  Lists TV shows by category (on the air, popular, top rated, airing today) with infinite scroll.

- **[`People`](src/components/TEmplate/People.jsx)**  
  Shows popular people (actors, etc.) with infinite scroll.

- **[`Moviedetails`](src/components/TEmplate/Moviedetails.jsx)**  
  Shows detailed info for a selected movie, including poster, genres, platforms, recommendations, and trailer.

- **[`Tvdetails`](src/components/TEmplate/Tvdetails.jsx)**  
  Shows detailed info for a selected TV show, including poster, genres, platforms, seasons, recommendations, and trailer.

- **[`Persondetails`](src/components/TEmplate/Persondetails.jsx)**  
  Shows detailed info for a selected person, including biography, social links, and credits.

- **[`Trailer`](src/components/TEmplate/Trailer.jsx)**  
  Displays a YouTube trailer for a movie or TV show if available.

## UI/Utility Components

- **[`Sidenav`](src/components/TEmplate/Sidenav.jsx)**  
  Sidebar navigation for main sections and info pages.

- **[`Topnav`](src/components/TEmplate/Topnav.jsx)**  
  Top navigation bar with a search input for movies, TV shows, and people.

- **[`Dropdown`](src/components/TEmplate/Dropdown.jsx)**  
  Reusable dropdown select component for filtering categories.

- **[`Cards`](src/components/TEmplate/Cards.jsx)**  
  Displays a grid of cards for movies, TV shows, or people.

- **[`HorizontalCards`](src/components/TEmplate/HorizontalCards.jsx)**  
  Displays a horizontal scrollable list of cards, used for recommendations and credits.

- **[`Header`](src/components/TEmplate/Header.jsx)**  
  Shows a large header banner with a featured trending item.

- **[`Loader`](src/components/TEmplate/Loader.jsx)**  
  Shows a loading spinner while data is being fetched.

- **[`Notfound`](src/components/TEmplate/Notfound.jsx)**  
  Displays a "not found" image/message for missing content.

- **[`Capitalize`](src/components/TEmplate/Capitalize.jsx)**  
  Utility function to capitalize the first letter of a string.

## Store and API

- **[`Store`](src/store/Store.jsx)**  
  Configures Redux store with movie, tv, and person slices.

- **[`Moveslice`](src/store/reducers/Moveslice.jsx)**  
  Redux slice for movie details.

- **[`Tvslice`](src/store/reducers/Tvslice.jsx)**  
  Redux slice for TV show details.

- **[`personslice`](src/store/reducers/personslice.jsx)**  
  Redux slice for person details.

- **[`movieactions`](src/store/actions/movieactions.jsx)**  
  Async actions for fetching movie details.

- **[`tvactions`](src/store/actions/tvactions.jsx)**  
  Async actions for fetching TV show details.

- **[`peopleactions`](src/store/actions/peopleactions.jsx)**  
  Async actions for fetching person details.

- **[`axios`](src/utlis/axios.jsx)**  
  Axios instance configured for TMDb API requests.

---

For more details, see the source code for each component in the [`src/components`](src/components) and [`src/components/TEmplate`](src/components/TEmplate)