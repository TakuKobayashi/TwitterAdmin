import { NextFunction, Request, Response } from 'express';
require('dotenv').config();

const express = require('express');
const twitterAuthRouter = express.Router();

twitterAuthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello auth');
});

export { twitterAuthRouter };