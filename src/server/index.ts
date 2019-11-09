import * as express from "express";
import upload from "./upload";
import view from "./view";

const server = express();

server.use("/api/upload", upload);
server.use("/api/view", view);

server.listen(3000, () => {
	console.log("CloneViewer started.");
});

server.use((req, res, next) => {
	res.sendStatus(404);
});
