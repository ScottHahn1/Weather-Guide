import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/weatherRoutes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/server/weather', router);

app.listen(process.env.PORT);