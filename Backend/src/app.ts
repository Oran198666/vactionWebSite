import express, { Request, Response } from "express";

const server = express();

server.use(express.json());

server.get("/api/test", (request: Request, response: Response) => {
    response.json({ message: "Server running" });
});

server.listen(4000, () => console.log("Listening on http://localhost:4000"));