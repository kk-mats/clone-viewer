import * as express from "express";

import upload from "./upload";

const server = express();

server.post("/upload", upload);

server.get("/", (req, res) => {
	res.send("Server Home");
});

server.listen(3000, () => {
	console.log("CloneViewer started.");
});
