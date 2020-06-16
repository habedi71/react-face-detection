import React from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

/// Components
import Logo from "./components/logo/Logo";
import LinkForm from "./components/linkform/LinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";

import "./App.css";

const app = new Clarifai.App({
	apiKey: "xxxxxxxxxxxxxxxxxx",
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imgUrl: "",
			faceBoxes: [],
		};
	}

	handleChange = (e) => {
		this.setState({ input: e.target.value });
	};

	handleSubmit = (e) => {
		const input = document.getElementById("inlineFormInputName");
		if (this.state.input.length === 0) {
			input.setAttribute("placeholder", "Enter Valid Image URL");
			input.focus();
			return;
		}
		this.setState({ imgUrl: this.state.input, faceBoxes: [] });
		/// Calling Clarifai API to process an image and return data for
		/// calculating boxes for the detected faces
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, `${this.state.input}`)
			.then((response) => {
				this.setState({ faceBoxes: this.getFaceBoundaries(response) });
			})
			.catch((err) => {
				document.getElementById("imgDiv").textContent = "Failed to process, try another image!";
			});
	};

	getFaceBoundaries = (data) => {
		return this.calFaceBox(data.outputs[0].data.regions.map((r) => r.region_info.bounding_box));
	};

	calFaceBox = (faceFoundaries) => {
		const inputImageElement = document.getElementById("inputImage");
		const imgWidth = Number(inputImageElement.width);
		const imgHeight = Number(inputImageElement.height);
		return faceFoundaries.map((fb) => {
			return {
				left: Math.floor(imgWidth * fb.left_col),
				right: Math.floor(imgWidth - imgWidth * fb.right_col),
				top: Math.floor(imgHeight * fb.top_row),
				bottom: Math.floor(imgHeight - imgHeight * fb.bottom_row),
			};
		});
	};

	render() {
		return (
			<>
				<Particles
					className="particles"
					params={{ number: { value: 130, density: { enable: true, value_area: 800 } } }}
				/>
				<Logo />
				<LinkForm onChangeProps={this.handleChange} onSubmiProps={this.handleSubmit} />
				<FaceRecognition imgUrl={this.state.imgUrl} faceBoundaries={this.state.faceBoxes} />
			</>
		);
	}
}

export default App;
