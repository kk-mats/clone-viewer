import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";

import { CloneContext } from "../states/store";
import { Action, ActionType } from "../states/action";

type Props = RouteComponentProps & {
	resultNames: string[];
};

const RESULT_SELECT = "result-select";

const ResultSelect: React.FunctionComponent<Props> = (props: Props) => {
	const { resultNames } = props;
	const { state, dispatch } = React.useContext(CloneContext);

	const onChangeHandler = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	): void => {
		const value = event.target.value as string;
		dispatch({
			type: ActionType.CHANGE_RESULT,
			payload: { ...state, result: value }
		} as Action);
	};

	return (
		<FormControl>
			<InputLabel htmlFor={RESULT_SELECT}>Result</InputLabel>
			<Select
				value={state.result}
				onChange={onChangeHandler}
				inputProps={{ id: RESULT_SELECT }}
			>
				{resultNames.map(n => {
					return (
						<MenuItem key={n} value={n}>
							{n}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default withRouter(ResultSelect);
