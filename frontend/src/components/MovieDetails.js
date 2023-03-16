import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const MovieDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([{}])

    useEffect(() => {
        fetch(`http://localhost:5000/movie/${id}`).then(
          response => response.json()
        ).then(
          data => {
            setDetails(data["movies"])
          }
        )
      }, []);

    return ( 
        
        <div>
            {details && <img className="br-100 h3 w3 dib" alt="poster" src={[]} />}
            <div>
            <h1>{details[0]["movie_name"]}</h1>
            <h2>genre: {details[0]["movie_tags"]}</h2>
            <p>description: {details[0]["movie_dis"]}</p>
            </div>
        </div>
    );
}
 
export default MovieDetails;