import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/location', async (req, res) => {
  const { location } = req.query;
  
  if (location) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);

    try {
      res.status(200).json(response.data);
    } catch(err) {
      res.send(err);
    } 
  } 
})

router.get('/onecall', async (req, res) => {
  if (req.query.lat && req.query.lon) {
    const { lat, lon, exclude, units } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);

    try {
      res.status(200).json(response.data);
    } catch(err) {
      res.send(err);
    }
  }
})

router.get('/daily', async (req, res) => {
  if (req.query.lat && req.query.lon) {
    const { lat, lon, units } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);

    try {
      res.status(200).json(response.data);
    } catch(err) {
      res.send(err);
    }
  }
})

export default router;