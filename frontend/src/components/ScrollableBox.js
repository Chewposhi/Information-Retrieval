import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';

const ScrollableBox = ({movies}) => {
    const ref = useRef(null);
    const scroll = (ref, scrollOffset) => {
        // Get the width of the viewport
        const viewportWidth = window.innerWidth;

        // Calculate the scroll distance based on the viewport width
        const calculatedScrollOffset = scrollOffset * (viewportWidth / 100); // Adjust factor as needed

        // Scroll the element by the calculated scroll offset
        ref.current.scrollLeft += calculatedScrollOffset;

        // console.log(ref.current.scrollLeft);
        // console.log(ref.current);
    };
    return (
        <div className="flex flex-col gap-4 my-6">
            <div className='flex justify-around relative'>
                <button onClick={() => scroll(ref, -80)} className="mr-2">
                    <FaChevronLeft /> {/* Icon for scrolling left */}
                </button>
                <button onClick={() => scroll(ref, +80)}>
                    <FaChevronRight /> {/* Icon for scrolling right */}
                </button>
            </div>
            {movies && <div className='flex gap-4 overflow-x-scroll' ref={ref} style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', 'overflow-y': 'hidden' }}>
                {movies.map((movie, idx) => (
                    <div key={idx}>
                        <Card movie={movie} isMore={false}/>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default ScrollableBox;