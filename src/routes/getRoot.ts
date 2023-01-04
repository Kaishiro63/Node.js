import { Application } from "express-ws";
import path from "path";
import { findUserById } from "../repositories/userRepository";

export function getRoot(app: Application) {
  app.get("/", async (req, res) => {
    try {
      const user = await findUserById(req.signedCookies.ssid);
      if (!user) {
        res.clearCookie("ssid");
        res.redirect("/login");
        return;
      }

      res.sendFile(path.join(__dirname, "../../pages/index.html"));
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  });
}
