import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Review from './Review';
import Scroll from './Scroll';
import ReviewList from './ReviewsList';
import '../Styles/review.css';
const MovieDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([{}]);
    const [reviews, setReviews] = useState(null);
    const [reviewsloaded, setReviewsloaded] = useState(false);
    const [poster, setPoster] = useState(null);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dbe439b5fbmsh9e034485ec08f21p19ca13jsn40de937bb717',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    useEffect(() => {
      // fetch detials from solr
      fetch(`http://localhost:5000/movie/${id}`).then(
        response => response.json()
      ).then(
        data => {
          setDetails(data["movies"])
        }
      );

      // fetch reviews from imdb
      fetch('https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=tt0944947', options)
      .then(response => response.json())
      .then(response => {console.log(response);
                         setReviews(response);
                         setPoster(true);
                         setReviewsloaded(true);
                         })
      .catch(err => console.error(err));
      console.log(reviews);

      // fetching test data from json server
      /*fetch("http://localhost:8000/reviews")
      .then(response => response.json())
      .then(response => {
        setReviews(response);
        setPoster(true);
        setReviewsloaded(true);

      }
      );*/
      
    }, []);


    //console.log(reviews[0].base.image.url);
    function reviewsList() {
      return (
        <Scroll>
          <ReviewList Reviews={reviews} />
        </Scroll>
      );
    }

    return ( 
        
        <div>
            {poster && <img className="br-50 h10 w5 dib" alt="poster" src={[reviews.base.image.url]} />}
            <div>
              <h1>{details[0]["movie_name"]}</h1>
              <h2>genre: {details[0]["movie_tags"]}</h2>
              <p>description: {details[0]["movie_dis"]}</p>
            </div>
            <div>
              <h1>Reviews</h1>
              {reviewsloaded && reviewsList()}
            </div>
            
        </div>
    );
}
 
export default MovieDetails;