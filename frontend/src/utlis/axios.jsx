import axios from "axios";
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzMwYTQyNTlmMWU3MmM4ZTk0ODMyNGVmNzhiM2UzZSIsIm5iZiI6MTc1MjgzNDQyNC41NDgsInN1YiI6IjY4N2EyMTc4M2NmMTAwNjAwYjUyODExZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7nyzVEP75SGcNq8OFTzu7EaehCaj34LlA6Lad2Ge-YM'
  }

})
export default instance;