import React from "react";
import "./facerecognition.css";

const FaceRecognition = ({ imgUrl, faceBoundaries }) => {
	let key = 0;
	const boundaries = faceBoundaries.map((face) => (
		<div
			key={++key}
			className="faceBox"
			style={{
				left: `${face.left}px`,
				right: `${face.right}px`,
				top: `${face.top}px`,
				bottom: `${face.bottom}px`,
			}}
		></div>
	));

	return (
		<div className="row justify-content-center align-items-center">
			<div id="imgDiv" className="col col-10 col-lg-8 col-xl-5 text-center pt-2">
				<img id="inputImage" src={imgUrl} alt="" />
				{boundaries}
			</div>
		</div>
	);
};

export default FaceRecognition;
