import axios, { AxiosInstance } from "axios";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  title: string;
}

export interface IGetMoviesResult {
  dates: string;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

// const API_KEY = process.env.REACT_APP_PUBLIC_URL;
const API_KEY = "061fd4148b8e00ffff2a69c4b72b2d15";
const BASE_PATH = "https://api.themoviedb.org/3";

export const getMovies = async () => {
  return await axios
    .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
