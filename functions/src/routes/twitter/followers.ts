import { NextFunction, Request, Response } from 'express';
import * as Twit from 'twit';
require('dotenv').config();

const twitter = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY!,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET!,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

const express = require('express');
const twitterFollowersRouter = express.Router();

twitterFollowersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.get('/followers', async (req: Request, res: Response, next: NextFunction) => {
  const frollowerIds = await twitter.get('followers/ids', { screen_name: 'taptappun' });
  console.log(frollowerIds);
  res.json(frollowerIds);
});

export { twitterFollowersRouter };