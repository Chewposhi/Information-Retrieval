import React from "react";
import Card from './Card';


function MoreLikeThisList({ MoreList }) {
  const More = MoreList.map(movie =>  <Card key={movie["id"]} movie={movie} />);
   
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      {More}
    </div>
  );
}

export default MoreLikeThisList;