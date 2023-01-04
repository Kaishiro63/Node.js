import expressWs, { Application } from "express-ws";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { postLogin } from "./routes/postLogin";
import { authenticationMiddleware } from "./middleware/authenticationMiddleware";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";

const SECRET_KEY = "MySecretKeyIsAwesome";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use((req, res, next) => {});

  app.use(cookieParser(SECRET_KEY));
  app.use(express.static(path.join(__dirname, "../public")));

  getLogin(app);
  postLogin(app);
  getRegister(app);
  postRegister(app);

  app.use(authenticationMiddleware);
  getRoot(app);
  getWs(app, sockets);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next();
  });

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
}

main();
