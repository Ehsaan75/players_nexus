import * as functions from "firebase-functions";
import next from "next";
import express, {Request, Response} from "express";
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({dev, conf: {distDir: "../.next"}});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  server.get("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  exports.nextServer = functions.https.onRequest(server);
});
