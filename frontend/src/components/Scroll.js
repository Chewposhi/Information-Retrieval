// src/components/Scroll.js

import React from 'react';

const Scroll = (props) => {
  console.log(props);
  return( 
    <div style={{overflowY: 'scroll', height:props.height}}>
      {props.children}
    </div>	
  );
}

export default Scroll;