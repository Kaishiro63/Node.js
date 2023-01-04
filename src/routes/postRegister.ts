import { Application } from "express-ws";
import bodyParser from "body-parser";
import { createUser, findUserByEmail } from "../repositories/userRepository";

export function postRegister(app: Application) {
  app.post("/register", bodyParser.urlencoded(), async (req, res) => {
    try {
      const email = req.body.email;
      const name = req.body.name;

      if (!email || !name) {
        res.status(400).send("Bad Request");
        return;
      }

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        res.status(400).send("Email already used");
        return;
      }

      const user = await createUser(email, name);
      res.cookie("ssid", user.id, {
        signed: true,
        httpOnly: true,
        sameSite: true,
      });
      res.redirect("/");
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  });
}
