import path from "path";
import { Application } from "express-ws";
import { findUserById } from "../../repositories/userRepository";

export function getRoot(app: Application) {
  app.get("/", async (req, res) => {
    const ssid = parseInt(req.cookies.ssid ?? "", 10);
    if (!req.signedCookies.ssid) {
      res.redirect("/login");
      return;
    }

    const user = await findUserById(req.signedCookies.ssid);
    if (!user) {
      res.clearCookie("ssid");
      res.redirect("/login");
      return;
    }

    res.sendFile(path.join(__dirname, "../../../pages/home.html"));
  });
}
