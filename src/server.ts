import expressWs, { Application } from "express-ws";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { authenticationMiddleware } from "./middleware/authenticationMiddleware";
import { getChat } from "./routes/chat/getChat";
import { getLogin } from "./routes/login/getLogin";
import { getLogout } from "./routes/login/getLogout";
import { postLogin } from "./routes/login/postLogin";
import { deleteProfile } from "./routes/profile/deleteProfile";
import { getProfile } from "./routes/profile/getProfile";
import { postProfile } from "./routes/profile/postProfile";
import { getRegister } from "./routes/register/getRegister";
import { postRegister } from "./routes/register/postRegister";
import { getRoot } from "./routes/ws/getRoot";
import { getWs } from "./routes/ws/getWs";

const SECRET_KEY = "MySecretKeyIsAwesome";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use(cookieParser(SECRET_KEY));
  app.use(express.static(path.join(__dirname, "../public")));

  getLogin(app);
  postLogin(app);
  getRegister(app);
  postRegister(app);

  app.use(authenticationMiddleware);
  getProfile(app);
  postProfile(app);
  deleteProfile(app);
  getRoot(app);
  getLogout(app);
  getChat(app);
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
