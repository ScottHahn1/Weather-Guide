import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/weatherRoutes';
import serverless from 'serverless-http';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('https://weather-app-z2e6.onrender.com/server/weather', router);

app.listen(process.env.PORT);

export const handler = serverless(app); 