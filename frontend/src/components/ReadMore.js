import { useState } from "react";

const ReadMore = ({children}) => {

    const [isReadMore, setIsMore]= useState(false);
    const toggleBtn = () =>{
        setIsMore(prevState => !prevState);
    }
    return (
        <div>
            {isReadMore ? children : children.substr(0,200)}
            <button style={{cursor:'pointer'}} onClick={toggleBtn}>{isReadMore ? "Read Less" : "Read More"}</button>
        </div>

    )
}

export default ReadMore;