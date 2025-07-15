import React from "react";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const imgUrl = `https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.backdrop_path}`;
  console.log(movie);
  return (
    <div className="movie-card-wrap">
      <img src={imgUrl} width="100%" alt={"인기영화"} />
    </div>
  );
};

export default MovieCard;
