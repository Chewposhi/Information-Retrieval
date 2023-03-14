import React from 'react';
import { useParams } from 'react-router';

const MovieDetails = () => {
    const {id} = useParams();

    return ( 
        <h2>movie details {id}</h2>
    );
}
 
export default MovieDetails;