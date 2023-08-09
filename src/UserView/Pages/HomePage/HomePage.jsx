import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieServ } from "../../../services/movieServ";
import MoviesBanner from "./MoviesBanner";
import MoviesList from "./MoviesList";
import { setIsLoading } from "../../redux/slices/generalSlice";

export default function HomePage() {
  let [movies, setMovies] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    movieServ
      .getMovieList()
      .then((res) => {
        // console.log(res);
        setMovies(res.data.content);
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  }, []);
  return (
    <>
      <MoviesBanner />
      <div className="container xl:max-w-screen-xl mx-auto">
        <MoviesList moviesList={movies} />
      </div>
    </>
  );
}
