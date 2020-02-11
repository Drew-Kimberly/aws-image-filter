import express, { Express } from 'express';
import { IndexRouter } from './controllers/v0/index.router';
import { HealthRouter } from './health.router';

(async () => {
  // Init the Express application
  const app: Express = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Route all API traffic to our index router.
  app.use('/api/v0/', IndexRouter);

  // Add a health check route.
  app.use('/', HealthRouter);

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
