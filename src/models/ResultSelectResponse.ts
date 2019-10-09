type ResultSelectResponse = {
	target: string;
	results: [
		{
			environment: {
				name: string;
				source: string;
				cloneDetector: {
					name: string;
					parameters: [
						{
							[name in string]: string;
						}
					];
				};
			};
			numberOfClonePairs: number;
		}
	];
};

export default ResultSelectResponse;
