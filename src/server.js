import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import produtosRoutes from './routes/produtos.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API da Pizzaria funcionando',
    rotas: {
      categorias: {
        listar: 'GET /api/categorias'
      },
      produtos: {
        listar: 'GET /api/produtos',
        buscarPorId: 'GET /api/produtos/:id',
        criar: 'POST /api/produtos',
        atualizar: 'PUT /api/produtos/:id',
        deletar: 'DELETE /api/produtos/:id'
      }
    }
  });
});

app.use('/api/categorias', categoriasRoutes);
app.use('/api/produtos', produtosRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada'
  });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;