import React from "react";
import Card from './Card';


function MoreLikeThisList({ MoreList }) {
  const More = MoreList.map(movie =>  <Card key={movie["id"]} movie={movie} isMore={true}/>);
   
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
      {More}
    </div>
  );
}

export default MoreLikeThisList;