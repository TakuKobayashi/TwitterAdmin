import { NextFunction, Request, Response } from 'express';
//import * as Twit from 'twit';
require('dotenv').config();

/*
const twitter = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY!,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET!,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
*/

const express = require('express');
const twitterCampaignsFollowersRouter = express.Router();

twitterCampaignsFollowersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsFollowersRouter.get('/followers', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsFollowersRouter.post('/followers/create', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsFollowersRouter.post('/followers/update', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsFollowersRouter.post('/followers/delete', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsFollowersRouter.post('/followers/lottery', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterCampaignsFollowersRouter };