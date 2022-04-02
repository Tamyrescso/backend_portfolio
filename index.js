const express = require('express');
const { Messages } = require('./models');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/send', async (_req,res) => {
  res.send('Use the following structure to make a POST requisition: { name: xxxxx, email: xxx@xxx.com, message: xxxxxxxxx }')
})

app.post('/send', async (req, res) => {

  const { name, email, content, language } = req.body;

  const message = await Messages.create({ name, email, content });

  if(!message) return res.status(500).json({ "message": "Erro ao enviar mensagem, tente novamente mais tarde." })

  const returnMessage = language === 'pt' ? "Mensagem enviada com sucesso!" : "Message sent successfully!"

  return res.status(201).json({ "message": returnMessage });
});

app.listen(port, () => console.log(`Servidor online na porta ${port}`));
