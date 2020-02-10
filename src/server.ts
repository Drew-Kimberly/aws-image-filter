import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/v0/index.router';

(async () => {
  // Init the Express application
  const app: Express = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Setup CORS middleware.
  const originWhitelist: string[] = ['http://localhost:8102'];
  const corsOptions: CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization'
    ],
    origin: (
      origin: string,
      callback: (err: Error | null, allow?: boolean) => void
    ) =>
      originWhitelist.includes(origin)
        ? callback(null, true)
        : callback(null, false)
  };
  app.use(cors(corsOptions));
  app.options('*', cors());

  // Route all API traffic to our index router.
  app.use('/api/v0/', IndexRouter);

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
