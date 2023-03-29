import React from "react";
import ReadMore from "./ReadMore";
import {
  Card,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";

function Body({review}) {
  return (
    <Card style={{borderStyle:'groove'}}>
      <CardBody>
        <div className="reviews-top">
          <div className="user-details">
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              User Name: {review.author.displayName}
            </CardSubtitle>
          </div>
          <div className="reviews-body">
            <ReadMore>
              {review.reviewText}
            </ReadMore>
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