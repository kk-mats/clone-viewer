import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import Axios from "axios";
import { CircularProgress, useTheme } from "@material-ui/core";
import { History } from "history";

import Navigator from "./Navigator";
import ResultSelect from "./ResultSelect";
import ResultProperty from "./ResultProperty";
import ResultSelectResponse from "../../models/ResultSelectResponse";
import Provider, { CloneContext } from "../states/store";
import useStyles from "../styles/styles";

type WrapperProps = RouteComponentProps<{
	filename: string;
}>;

export const UrlWrapper: React.FunctionComponent<WrapperProps> = (
	props: WrapperProps
) => {
	const { match, history } = props;
	const { filename } = match.params;
	return (
		<Provider filename={filename}>
			<CloneView history={history} />
		</Provider>
	);
};

type Props = {
	history: History;
};

const CloneView: React.FunctionComponent<Props> = (props: Props) => {
	const { history } = props;
	const { state, dispatch } = React.useContext(CloneContext);
	const { filename } = state;
	const [results, setResults] = React.useState<ResultSelectResponse | null>(
		null
	);

	const classes = useStyles(useTheme);

	React.useEffect(() => {
		Axios.get(`/api/view/${filename}`).then(value => {
			const data = value.data as ResultSelectResponse;
			setResults(data);
		});
	}, []);

	React.useEffect(() => {
		if (state.result) {
			history.push(`/view/${filename}/${state.result}`);
		}
	}, [state.result]);

	if (!results) {
		return <CircularProgress />;
	}

	const names: string[] = [];
	results.results.forEach(value => {
		names.push(value.environment.name);
	});

	return (
		<div className={classes.root}>
			<Navigator />
			<main className={classes.content}>
				<ResultSelect resultNames={names} />
				<Switch>
					<Route
						path={`/view/${filename}/:result`}
						component={ResultProperty}
					/>
					<Route
						path={`/view/${filename}`}
						component={() => {
							return <p> statistics </p>;
						}}
					/>
				</Switch>
			</main>
		</div>
	);
};

export default CloneView;
