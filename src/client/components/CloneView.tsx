import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";

import CloneList from "./CloneList";

type Props = RouteComponentProps<{ filename: string; id: string }>;

const CloneView: React.FunctionComponent<Props> = (props: Props) => {
	const { filename, id } = props.match.params;
	return <CloneList filename={filename} id={id} />;
};

export default CloneView;
