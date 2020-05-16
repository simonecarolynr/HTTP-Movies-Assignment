import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const { getMovieList, addToSavedList, history } = props;

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // getMovieList()
        history.push(`/`)
      })
      .catch(err => console.log('Delete Movie Error: ', err.message))
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>Save</div>
      <div className="update-button" onClick={() => history.push(`/update-movie/${id}`)}>Update</div>
      <div className="delete-button" onClick={deleteMovie}>Delete</div>

    </div>
  );
}

export default Movie;
