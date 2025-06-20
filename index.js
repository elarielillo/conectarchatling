const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const VERIFY_TOKEN = 'tralalero';
const N8N_URL = 'https://bot-ramsa-n8n.9v9s7u.easypanel.host/webhook-test/entrada-chat';

app.get('/entrada-chat', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verificado con Meta');
    return res.status(200).send(challenge);
  } else {
    console.log('❌ Verificación fallida con Meta');
    return res.status(403).send('Token inválido');
  }
});

app.post('/entrada-chat', async (req, res) => {
  const body = req.body;
  const numero = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from || 'sin-numero';

  console.log(`📦 Mensaje completo recibido:\n${JSON.stringify(body, null, 2)}`);

  try {
    const response = await axios.post(N8N_URL, body);
    console.log('✅ Enviado a n8n correctamente');
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error al enviar a n8n:', error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${port}`);
});
