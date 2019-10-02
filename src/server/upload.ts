import * as express from "express";
import * as multer from "multer";

const storage = multer.diskStorage({
	destination: "./clone_cache",
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});

const upload = (req: express.Request, res: express.Response): void => {
	const requestHandler = multer({ storage }).single("clonefile");
	requestHandler(req, res, err => {
		if (err) {
			res.send(`Failed to write ${req.file.destination} with ${err}`);
			return;
		}
		res.redirect(`/view/${req.file.filename}`);
		console.log(
			`Uploaded ${req.file.originalname} as ${req.file.filename} size:${req.file.size}`
		);
	});
};

export default upload;
