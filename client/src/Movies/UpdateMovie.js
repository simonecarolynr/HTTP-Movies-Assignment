import React, { useState } from 'react';
import axios from 'axios';

export const UpdateMovie = () => {

    const [ movie, updateMovie ] = useState([{
        id: 0,
        title: '',
        director: '',
        metascore: 0,
        stars: []
    }]);

    const handleChange = e => {
        updateMovie(...movie, {
            [e.target.name] : e.target.value
        })
    };

    const handleSubmit = e => {
        axios
        .put(`http://localhost:5000/api/update-movie/${movie.id}`, movie)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input name='title' placeholder='title' value={movie.title} onChange={handleChange} />
            <input name='director' placeholder='director' value={movie.director} onChange={handleChange} />
            <input name='metascore' placeholder='metascore' value={movie.metascore} onChange={handleChange} />
            <input name='stars' placeholder='stars' value={movie.stars} onChange={handleChange} />
            <button type='submit'>Update</button>
        </form>
    )

}