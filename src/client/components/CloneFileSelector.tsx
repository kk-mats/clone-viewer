import * as React from "react";
import * as ReactDOM from "react-dom";

const CloneFileSelector: React.FunctionComponent = () => {
	const [filename, setFileName] = React.useState("Not selected");

	return (
		<form method="post" action="/api/upload" encType="multipart/form-data">
			<label id="filename" htmlFor="CloneFileSelector">
				{filename === "Not selected"
					? "Select a detection result file"
					: filename}
			</label>
			<input
				type="file"
				accept=".jcln, .json"
				name="clonefile"
				onChange={(event): void => {
					if (event.target.files && event.target.files.item(0)) {
						setFileName(event.target.files.item(0).name);
					}
				}}
			/>
			<input
				type="submit"
				value="load"
				disabled={filename === "Not selected"}
			/>
		</form>
	);
};

export default CloneFileSelector;
