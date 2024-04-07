import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { styles } from '../styles';

import ScrollableBox from '../components/ScrollableBox'
import Review from '../components/Review';

const MovieDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [reviewsloaded, setReviewsloaded] = useState(false);
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
          // console.log(data["movies"])
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

      // fetching test data from json server
      // fetch("http://localhost:8000/reviews")
      // .then(response => response.json())
      // .then(response => {
      //   setReviews(response[0]);
      //   setPoster(true);
      //   setReviewsloaded(true);
      // }
      // );
      
    }, []);
      
    // fetching reviews from imdb 
    useEffect(() => {
      if(details != null){
        // fetch reviews from imdb
        fetch(`https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${details[0].movie_id}`, options)
        .then(response => response.json())
        .then(response => {setReviews(response);
                          setPoster(true);
                          setReviewsloaded(true);
                          })
        .catch(err => console.error(err));
      } 
    }, [details]);


    return ( 
        
        <div className='flex flex-col'>
          <div className='flex gap-4 flex-wrap justify-center'>
            {poster && <img className="br-50 h10 w5 dib" alt="poster" src={[reviews.base.image.url]} />}
              {details && <div className='flex flex-col items-center gap-2 mb-4'>
                <h1 className={`${styles.heroSubText}`}>{details[0]["movie_name"]} ({details[0]["movie_year"]})</h1>
                <h2 style={{color:'white'}}>Genre: </h2>
                <h3 style={{color:'white'}}>{details[0]["movie_tags"]}</h3>
                <h2 style={{color:'white'}}>Rating: </h2>
                <h3 style={{color:'white'}}>{details[0]["movie_star"]}</h3>
                <h2 style={{color:'white'}}>Director/Cast: </h2>
                <h3 style={{color:'white'}}>{details[0]["movie_director_cast"].join(', ')}</h3>
                <h2 style={{color:'white'}}>Description: </h2>
                <h3 style={{color:'white'}}>{details[0]["movie_dis"]}</h3>
                  <button onClick={()=>(window.open("https://r.mtdv.me/watch?v=RYv6zes4do"))} style={{cursor:'pointer', borderRadius:'10px', color:'gold', background:'grey', width:'200px', height:'70px', fontSize:'30px'}}>Watch Now</button>
              </div>}
          </div>
            {/* more like this section */}
            <div className='mx-2 flex flex-col'>
              <div>
                <h2 className={`${styles.heroSubText} my-4`}>Not what you were looking for? Here are similar movies</h2>
                {moreLoaded && <ScrollableBox movies={moreCombined}/>
                }
              </div>
              <div className='flex flex-col items-center'>
                <h2 className={`${styles.heroSubText} my-4`}>Reviews:</h2>
                {reviewsloaded && 
                  <div className='flex flex-col gap-4'>
                    {reviews.reviews.map((review, idx)=>(
                      <Review key={idx} review={review} />
                    ))}
                  </div>
                }
              </div>
            </div>
        </div>
    );
}
 
export default MovieDetails;