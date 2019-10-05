import * as React from "react";
import * as ReactDOM from "react-dom";
import fetch from "node-fetch";

import Axios from "axios";
import CloneListResponse from "../../models/cloneListResponse";

type Props = {
	filename: string;
	id: string | null;
};

const CloneList: React.FunctionComponent<Props> = (props: Props) => {
	const [cloneList, setCloneList] = React.useState<CloneListResponse | null>(
		null
	);
	const { filename, id } = props;

	React.useEffect(() => {
		Axios.get(`/api/view/${filename}`).then(value => {
			const data = value.data as CloneListResponse;
			console.log(`res = ${data}`);
			setCloneList(data);
		});
	}, []);

	if (!cloneList) {
		return <div>loading</div>;
	}

	console.log(`f = ${filename}`);
	console.log(`cloneList = ${cloneList}`);

	return (
		<div>
			<h1>{cloneList.target}</h1>
			<div>
				<h2>Results</h2>
				{...cloneList.results.map(value => {
					const { environment, numberOfClonePairs } = value;
					const { name, source, cloneDetector } = environment;
					return (
						<div key="name">
							<h3>
								{name}({numberOfClonePairs})
							</h3>
							<ul>
								<li>source: {source}</li>
								<li>cloneDetector: {cloneDetector.name}</li>
								<li>Parameters</li>
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CloneList;
