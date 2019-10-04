import * as React from "react";
import * as ReactDOM from "react-dom";
import axios, { AxiosResponse } from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CloneFileSelectorResponse from "../../models/CloneFileSelectorResponse";

const CloneFileSelector: React.FunctionComponent<RouteComponentProps> = (
	props: RouteComponentProps
) => {
	const [file, setFile] = React.useState<File | null>(null);

	const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		if (!file) {
			return;
		}

		event.preventDefault();
		const formData = new FormData();
		formData.append("clonefile", file, file.name);
		axios
			.post("/api/upload", formData, {
				headers: { "content-type": "multipart/form-data" }
			})
			.then((res: AxiosResponse<CloneFileSelectorResponse>) => {
				if (!res.data.success) {
					console.error(res.data.error);
				}
				props.history.push(res.data.redirect);
			})
			.catch(err => {
				console.error(`upload failed with ${err}`);
			});
	};

	return (
		<form method="post" onSubmit={onSubmitHandler}>
			<label id="filename" htmlFor="CloneFileSelector">
				{file ? file.name : "Select a detection result file"}
			</label>

			<input
				type="file"
				accept=".jcln, .json"
				name="clonefile"
				onChange={(event): void => {
					event.preventDefault();
					if (event.target.files && event.target.files[0]) {
						setFile(event.target.files[0]);
					}
				}}
			/>
			<button type="submit" disabled={!file}>
				load
			</button>
		</form>
	);
};

export default withRouter(CloneFileSelector);
