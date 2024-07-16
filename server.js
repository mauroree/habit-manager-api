const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://habit-manager-app.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const habitoRoutes = require('./routes/habitoRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/habitos', habitoRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});
