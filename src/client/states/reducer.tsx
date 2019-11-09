import { Store, ActionType, Action } from "./action";

export const initialState: Store = { filename: "error", result: "" };

const reducer: React.Reducer<Store, Action> = (state, action) => {
	switch (action.type) {
		case ActionType.CHANGE_FILENAME: {
			return {
				...state,
				filename: action.payload.filename
			};
		}

		case ActionType.CHANGE_RESULT: {
			return {
				...state,
				result: action.payload.result
			};
		}

		case ActionType.CHANGE_ID: {
			return {
				...state,
				id: action.payload.id
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default reducer;
