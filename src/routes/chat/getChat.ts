import path from "path";
import { Application } from "express-ws";

export function getChat(app: Application) {
  app.get("/chat", (req, res) => {
    if (req.signedCookies.ssid) {
      res.sendFile(path.join(__dirname, "../../pages/index.html"));
      return;
    }
    res.redirect("/login");
  });
}
