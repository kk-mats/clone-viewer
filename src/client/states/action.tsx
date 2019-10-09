import * as React from "react";

export type Store = {
	filename: string;
	result: string;
	id?: string;
};

export enum ActionType {
	CHANGE_FILENAME,
	CHANGE_RESULT,
	CHANGE_ID
}

export type Action = {
	type: ActionType;
	payload: Store;
};
