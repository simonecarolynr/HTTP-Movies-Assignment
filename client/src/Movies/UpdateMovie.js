import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function UpdateMovie (props) {

    const { history } = props;

    const {id} = useParams();

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setCurrentMovie(res.data))
          .catch((err) => console.log(err.response));
      };

      useEffect(() => {
        fetchMovie(id);
      }, [id]);

    const [currentMovie, setCurrentMovie] = useState({});
    const [title, setTitle] = useState(currentMovie.title);
    const [director, setDirector] = useState(currentMovie.director);
    const [metascore, setMetascore] = useState(currentMovie.metascore);
    const [stars, setStars] = useState(currentMovie.stars);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedMovie = {
                id,
                title: title || currentMovie.title,
                director: director || currentMovie.director,
                metascore: metascore || currentMovie.metascore,
                stars: stars || currentMovie.stars
            }
        axios 
        .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then((res) => {
            history.push(`/`)
        })
    }
    
    console.log('Current Movie: ', currentMovie);
    return (
        <form action="">
            <input type="text" placeholder={currentMovie.title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder={currentMovie.director} onChange={(e) => setDirector(e.target.value)} />
            <input type="text" placeholder={currentMovie.metascore} onChange={(e) => setMetascore(e.target.value)} />
            <input type="text" placeholder="STARS: " onChange={(e) => setStars(e.target.value)} />
            <input type="submit" value="submit" onClick={handleSubmit} />
        </form>
    )
}

export default UpdateMovie;