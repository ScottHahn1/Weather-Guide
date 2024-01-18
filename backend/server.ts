import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/weatherRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7777;

app.use(express.json());
app.use(cors());

app.use('/server/weather', router);

app.listen(port, () => console.log('Server running...'));