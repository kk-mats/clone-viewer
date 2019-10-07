import * as express from "express";
import * as essc from "express-serve-static-core";
import * as fs from "fs";
import { promisify } from "util";

import CloneListResponse from "../models/cloneListResponse";

const readCodeFile = async (filename: string): Promise<any> => {
	const text = await promisify(fs.readFile)(
		`./clone_cache/${filename}`,
		"utf-8"
	).catch(err => {
		return `{error: "Unable to read ${filename} ${err.message}"}`;
	});
	return JSON.parse(text);
};

const getCloneList = async (
	filename: string
): Promise<CloneListResponse | { error: string }> => {
	const json = await readCodeFile(filename);

	if (json.error) {
		return json as { error: string };
	}

	const { global, results } = json as {
		global: {
			target: string;
		};
		results: {
			environment: {
				name: string;
				source: string;
				clone_detector: { name: string };
				clone_pairs: { file_id: number }[];
			};
			clone_pairs: {
				file_id: number;
				begin: number;
				end: number;
			}[];
		}[];
	};
	return {
		target: global.target,
		results: [
			...results.map(value => {
				const { name, source, clone_detector } = value.environment;
				return {
					environment: {
						name,
						source,
						cloneDetector: {
							name: clone_detector.name
						}
					},
					numberOfClonePairs: value.clone_pairs.length
				};
			})
		]
	} as CloneListResponse;
};

const view = (
	req: essc.Request<{ filename: string }>,
	res: express.Response
): void => {
	const { filename } = req.params;
	getCloneList(filename).then(value => {
		res.json(value);
	});
};

export default view;
