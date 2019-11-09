import * as React from "react";
import reducer, { initialState } from "./reducer";
import { Store, Action } from "./action";

export const CloneContext = React.createContext<{
	state: Store;
	dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const Provider: React.FunctionComponent<
	React.PropsWithChildren<{ filename: string }>
> = (props: React.PropsWithChildren<{ filename: string }>) => {
	const { children, filename } = props;
	const [state, dispatch] = React.useReducer(reducer, {
		filename,
		result: ""
	});

	if (!children) {
		return <></>;
	}

	return (
		<CloneContext.Provider value={{ state, dispatch }}>
			{children}
		</CloneContext.Provider>
	);
};

export default Provider;
