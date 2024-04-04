// src/components/Scroll.js

import React from 'react';

const Scroll = (props) => {
  return( 
    <div className={`height-[20vh] overflow-x-scroll`}>
      {props.children}
    </div>	
  );
}

export default Scroll;