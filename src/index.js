/**
 * Express app: CORS, JSON body, /api/menu and /api/orders routes, health check.
 * Centralized error handler at the end. Listens on PORT (default 3001) unless NODE_ENV is test.
 */
import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu.js';
import ordersRoutes from './routes/orders.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
