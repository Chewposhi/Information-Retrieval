import React from "react";
import {
  Card,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";

function Body({review}) {
  return (
    <Card style={{borderStyle:'groove'}}>
      <CardBody style={{borderBottom:'dotted'}}>
        <div className="reviews-top">
          <div className="user-details">
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {review.author.displayName}
            </CardSubtitle>
            <div> 
                Rating: {review.authorRating}/10
            </div>
          </div>
          <div className="reviews-body">
            <CardText>
                {review.reviewText}
            </CardText>
          </div>
          <CardText>
            <small className="text-muted text-bold">
              {review.submissionDate}
            </small>
          </CardText>
        </div>
      </CardBody>
    </Card>
    
    
  );
}

export default Body;