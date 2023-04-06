import React, { useState } from "react";
import ReadMore from "./ReadMore";
import {
  Card,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";

function Body({review}) {
  const [sentiment, setSentiment] = useState(null);
  const [btnText, setBtnText] = useState('Analyse');

  const handleAnalyse = () => {
    setBtnText('Analyzing...');
    let cleaned = review.reviewText.replace(/[^a-z0-9]/gi, ' ');
    fetch('http://localhost:5000/AnalyseSent', {headers: {'review':cleaned}}).then(
      response => response.json()
    ).then(
      data => {
        const filtered = data.replace(/[^a-z0-9]/gi, '');
        setSentiment(filtered);
      }
    );
  }

  return (
    <Card style={{borderStyle:'groove'}}>
      <CardBody>
        <div className="reviews-top">
          <div className="user-details">
            <CardSubtitle className="mb-2 text-muted" tag="h6" style={{color:'white'}}>
              User Name: {review.author.displayName}
            </CardSubtitle>
            <p style={{margin:'30px', color:'white'}}>Sentiment Analysis:</p>
            {sentiment && <p style={{color:(sentiment === 'Positive') ? 'green':'red'}}> {sentiment}</p>}
            {!sentiment && <button style={{cursor:'pointer'}} onClick={()=>handleAnalyse()}>{btnText}</button>}
          </div>
          <div className="reviews-body" style={{color:'white'}}>
            <ReadMore>
              {review.reviewText}
            </ReadMore>
          </div>
          <CardText>
            <small className="text-muted text-bold" style={{color:'white'}}>
              {review.submissionDate}
            </small>
          </CardText>
        </div>
      </CardBody>
    </Card>
    
    
  );
}

export default Body;