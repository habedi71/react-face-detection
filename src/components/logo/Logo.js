import React from "react";
import brain from "./brain.png";
import "./logo.css";

const Logo = () => {
	return (
		<div className="row">
			<div className="bg-primary">
				<img src={brain} alt="Brain Logo" style={{ width: "100px", height: "100px" }} />{" "}
			</div>
		</div>
	);
};

export default Logo;
