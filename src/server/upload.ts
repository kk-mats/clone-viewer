import * as express from "express";
import * as multer from "multer";
import CloneFileSelectorResponse from "../models/CloneFileSelectorResponse";

const router = express.Router();

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
			console.log(`Failed to write with ${err}`);
			res.json({
				success: false,
				redirect: "/",
				error: err
			} as CloneFileSelectorResponse);
			return;
		}
		console.log(
			`Uploaded ${req.file.originalname} as ${req.file.filename} size:${req.file.size}`
		);
		res.json({
			success: true,
			redirect: `/view/${req.file.filename}`
		} as CloneFileSelectorResponse);
	});
};

router.post("/", upload);

export default router;
