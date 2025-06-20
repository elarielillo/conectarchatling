const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/entrada-chat", (req, res) => {
  const VERIFY_TOKEN = "tu_token_aqui";
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === VERIFY_TOKEN
  ) {
    console.log("Webhook verificado correctamente");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});

app.post("/entrada-chat", (req, res) => {
  console.log("📩 Mensaje recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("🚀 Servidor escuchando en el puerto " + PORT);
});
