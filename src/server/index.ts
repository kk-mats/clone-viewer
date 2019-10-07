import * as express from "express";
import upload from "./upload";
import view from "./view";

const server = express();

server.post("/api/upload", upload);

server.get<{ filename: string }>("/api/view/:filename", view);

server.listen(3000, () => {
	console.log("CloneViewer started.");
});

server.use((req, res, next) => {
	res.sendStatus(404);
});
