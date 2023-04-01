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
    const [moreByName, setMoreByName] = useState([]);
    const [moreByCast, setMoreByCast] = useState([]);
    const [moreCombined, setMoreCombined] = useState([]);
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
      
      // fetch more like this with half by name and half by cast
      Promise.all([
        fetch(`http://localhost:5000/MoreLikeThisName/${id}`),
        fetch(`http://localhost:5000/MoreLikeThisCast/${id}`),
      ])
        .then(([resName, resCast]) => 
          Promise.all([resName.json(), resCast.json()])
        )
        .then(([dataName, dataCast]) => {
          setMoreByName(dataName);
          setMoreByCast(dataCast);
          const combined = dataName.movies.concat(dataCast.movies);
          const uniqueIds = [];
          const unique = combined.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id);
          
            if (!isDuplicate) {
              uniqueIds.push(element.id);
          
              return true;
            }
          
            return false;
          });
          setMoreCombined(unique);
          setMoreloaded(true);
        });
      


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
      fetch("http://localhost:8000/reviews")
      .then(response => response.json())
      .then(response => {
        setReviews(response[0]);
        setPoster(true);
        setReviewsloaded(true);
      }
      );
      
    }, []);

    /*useEffect(() => {
      // fetch reviews from imdb
      fetch(`https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${details[0].movie_id}`, options)
      .then(response => response.json())
      .then(response => {setReviews(response);
                         setPoster(true);
                         setReviewsloaded(true);
                         })
      .catch(err => console.error(err));
      
    }, [details]);*/

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
          <MoreLikeThisList MoreList={moreCombined} />
        </Scroll>
      );
    }

    return ( 
        
        <div>
            {poster && <img className="br-50 h10 w5 dib" alt="poster" src={[reviews.base.image.url]} />}
            <div>
              <h1 style={{textDecoration:'underline', color:'white'}}>{details[0]["movie_name"]} ({details[0]["movie_year"]})</h1>
              <h2 style={{color:'white'}}>Genre: </h2>
              <h3 style={{color:'white'}}>{details[0]["movie_tags"]}</h3>
              <h2 style={{color:'white'}}>Rating: </h2>
              <h3 style={{color:'white'}}>{details[0]["movie_star"]}</h3>
              <h2 style={{color:'white'}}>Director/Cast: </h2>
              {/*details && <h3>{details[0]["movie_director_cast"].join(', ')}</h3>*/}
              <h2 style={{color:'white'}}>Description: </h2>
              <h3 style={{color:'white'}}>{details[0]["movie_dis"]}</h3>
              <a href="https://r.mtdv.me/watch?v=RYv6zes4do" target='_blank'>
                <button style={{cursor:'pointer', borderRadius:'10px', color:'gold', background:'grey', width:'200px', height:'70px', fontSize:'30px'}}>Watch Now</button>
              </a>
            </div>
            <div>
              <h2 style={{borderTop:'dotted', marginTop:'20px', color:'white'}}>Not what you were looking for? Here are movies with similar titles:</h2>
              {moreLoaded && moreList()}
              <h2 style={{borderTop:'dotted', color:'white'}}>Reviews:</h2>
              {reviewsloaded && reviewsList()}
            </div>
            
        </div>
    );
}
 
export default MovieDetails;