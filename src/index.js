import express from 'express';
import winston from 'winston';
import gradesRouter from './routes/grades.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.fileName = 'grades.json';
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile('grades.json');
    logger.info('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    writeFile('grades.json', JSON.stringify(initialJson))
      .then(() => {
        logger.info('API Started and File Created!');
      })
      .catch((err) => logger.error(err));
  }
});
