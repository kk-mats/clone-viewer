import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import CloneFileSelector from "./CloneFileSelector";
import { UrlWrapper } from "./CloneView";

const CloneViewer: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<div>
				<Route exact path="/" component={CloneFileSelector} />
				<Route path="/view/:filename" component={UrlWrapper} />
				<Route
					component={() => {
						return <p>missing</p>;
					}}
				/>
			</div>
		</BrowserRouter>
	);
};

export default CloneViewer;
