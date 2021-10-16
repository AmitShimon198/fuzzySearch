import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()
import  api  from './controllers/diagnosisController/diagnosis.js';
const app = express()
const {PORT} = process.env;

app.use(json())
app.use(cors())
app.use('/', api)
const startUp = async () => {
  app.listen(PORT, () => {
    console.log(`run on port:${PORT}`)
  })
}

startUp();