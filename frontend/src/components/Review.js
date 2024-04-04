import React, { useState } from "react";
import ReadMore from "./ReadMore";
import { styles } from "../styles";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Importing thumbs up and thumbs down icons

function Review({ review }) {
  const [sentiment, setSentiment] = useState(null);
  const [btnText, setBtnText] = useState('Analyse');

  const handleAnalyse = () => {
    setBtnText('Analyzing...');
    let cleaned = review.reviewText.replace(/[^a-z0-9]/gi, ' ');
    fetch('http://localhost:5000/AnalyseSent', { headers: { 'review': cleaned } }).then(
      response => response.json()
    ).then(
      data => {
        const filtered = data.replace(/[^a-z0-9]/gi, '');
        setSentiment(filtered);
      }
    );
  }

  return (
    <div className="w-full  p-4">
      <div className="border border-solid border-gray-300 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="mb-2 md:mr-4 flex flex-col items-center">
            <h6 className={`${styles.sectionSubText}`}>User Name: </h6>
            <h6 className="mb-2 text-lg font-semibold orange-text-gradient">{review.author.displayName}</h6>
            <p className="mb-4 text-sm font-semibold">Sentiment Analysis:</p>
            {sentiment && (
              <div className="flex items-center mb-4">
                {sentiment === 'Positive' ? <FaThumbsUp className="text-green-500 mr-2" /> : <FaThumbsDown className="text-red-500 mr-2" />}
                <p className="text-sm">{sentiment}</p>
              </div>
            )}
            {!sentiment && <button className="text-white bg-blue-500 py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none" onClick={handleAnalyse}>{btnText}</button>}
          </div>
          <div className="flex-1">
            <ReadMore>
              {review.reviewText}
            </ReadMore>
          </div>
        </div>
        <p className="text-sm text-gray-100 mt-2">Submission Date: {review.submissionDate}</p>
      </div>
    </div>
  );
}

export default Review;
