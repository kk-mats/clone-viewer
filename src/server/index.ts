import * as express from "express";
import upload from "./upload";
import view from "./view";

const server = express();

server.post("/upload", upload);

server.get("/", (req, res) => {
	res.send("Server Home");
});

server.get<{ filename: string }>("/view/:filename", (req, res) => {
	console.log("access to view");
	view(req, res);
});

server.listen(3000, () => {
	console.log("CloneViewer started.");
});

server.use((req, res, next) => {
	res.status(404);
	res.render("error", { message: "404: Page Not Found" });
});
