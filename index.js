const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// ✅ Ruta para verificación del webhook
app.get('/conectar-chat', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'tralalero') {
    console.log('Webhook verificado correctamente.');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Ruta POST para recibir mensajes (después de la verificación)
app.post('/conectar-chat', (req, res) => {
  console.log('Mensaje recibido:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
