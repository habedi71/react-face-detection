import React, { Component } from "react";
import "./linkform.css";

class LinkForm extends Component {
	constructor() {
		super();
		this.state = {
			link: "",
		};
	}

	handleChange = (e) => {
		this.setState({ link: e.target.value });
	};
	render() {
		return (
			<div className="row justify-content-center">
				<h5 className="d-block text-center text-danger justify-content-center col col-12">
					This magic brain will detect faces in photo
				</h5>
				<div className="col col-10 col-lg-8 col-xl-5 p-4 rounded border border-danger cssbg">
					<div className="form-row align-items-center">
						<div className="col-sm my-1">
							<label className="sr-only">URL</label>
							<input
								onChange={this.props.onChangeProps}
								type="text"
								name="inputImage"
								className="form-control shadow"
								id="inlineFormInputName"
								placeholder="URL"
							/>
						</div>
						<div className="col-auto my-1">
							<button className="btn btn-primary shadow" onClick={this.props.onSubmiProps}>
								Detect
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LinkForm;
