import React from "react";
import Card from './Card';


function MoreLikeThisList({ MoreList }) {
  const More = MoreList.map(movie =>  <Card key={movie["id"]} movie={movie} isMore={false}/>);
   
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'auto'}}>
      {More}
    </div>
  );
}

export default MoreLikeThisList;