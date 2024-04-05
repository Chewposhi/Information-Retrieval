// Filename: ./components/ToggleSwitch.js

import React from "react";

const ToggleSwitch = ({ label, mode, setMode }) => {
    const handleClick = () => {
        setMode(mode === 0 ? 1 : 0);
    };
return (
	<div className="container">
	{label}{" "}
	<div className="toggle-switch">
		<input type="checkbox" className="checkbox"
			name={label} id={label}  onClick={handleClick}/>
		<label className="label" htmlFor={label}>
		<span className="inner"/>
		<span className="switch" />
		</label>
	</div>
	</div>
);
};

export default ToggleSwitch;
