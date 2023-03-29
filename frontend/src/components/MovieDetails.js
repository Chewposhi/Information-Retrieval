import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Scroll from './Scroll';
import ReviewList from './ReviewsList';
import MoreLikeThisList from './MoreLikeThisList';
import '../Styles/review.css';

const MovieDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([{}]);
    const [reviews, setReviews] = useState(null);
    const [reviewsloaded, setReviewsloaded] = useState(false);
    const [more, setMore] = useState(null);
    const [moreLoaded, setMoreloaded] = useState(false);
    const [poster, setPoster] = useState(null);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_IMDb_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    useEffect(() => {
      // fetch movie detials from solr
      fetch(`http://localhost:5000/movie/${id}`).then(
        response => response.json()
      ).then(
        data => {
          setDetails(data["movies"])
        }
      );

      // fetch more like this from solr
      fetch(`http://localhost:5000/MoreLikeThis/${id}`).then(
        response => response.json()
      ).then(
        data => {
          setMore(data.movies);
          setMoreloaded(true);
        }
      );

      // fetch reviews from imdb
      /*fetch(`https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${details[0].movie_id}`, options)
      .then(response => response.json())
      .then(response => {setReviews(response);
                         setPoster(true);
                         setReviewsloaded(true);
                         console.log(reviews);
                         })
      .catch(err => console.error(err));*/

      // fetching test data from json server
      /*fetch("http://localhost:8000/reviews")
      .then(response => response.json())
      .then(response => {
        setReviews(response[0]);
        setPoster(true);
        setReviewsloaded(true);
      }
      );*/
      
    }, []);

    useEffect(() => {
      // fetch reviews from imdb
      fetch(`https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${details[0].movie_id}`, options)
      .then(response => response.json())
      .then(response => {setReviews(response);
                         setPoster(true);
                         setReviewsloaded(true);
                         console.log(reviews);
                         })
      .catch(err => console.error(err));
      
    }, [details]);

    function reviewsList() {
      return (
        <Scroll height={'70vh'}>
          <ReviewList Reviews={reviews} />
        </Scroll>
      );
    }

    function moreList() {
      return (
        <Scroll height={'40vh'}>
          <MoreLikeThisList MoreList={more} />
        </Scroll>
      );
    }

    return ( 
        
        <div>
            {poster && <img className="br-50 h10 w5 dib" alt="poster" src={[reviews.base.image.url]} />}
            <div>
              <h1 style={{textDecoration:'underline'}}>{details[0]["movie_name"]}</h1>
              <h2>Genre: </h2>
              <h3>{details[0]["movie_tags"]}</h3>
              <h2>Description: </h2>
              <h3>{details[0]["movie_dis"]}</h3>
            </div>
            <div>
              <h2 style={{borderTop:'dotted', marginTop:'20px'}}>Not what you were looking for? Here are movies with similar titles:</h2>
              {moreLoaded && moreList()}
              <h2 style={{borderTop:'dotted'}}>Reviews:</h2>
              {reviewsloaded && reviewsList()}
            </div>
            
        </div>
    );
}
 
export default MovieDetails;