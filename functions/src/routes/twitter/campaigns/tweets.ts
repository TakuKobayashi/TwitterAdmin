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
const twitterCampaignsTweetsRouter = express.Router();

twitterCampaignsTweetsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsTweetsRouter.get('/tweets', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsTweetsRouter.post('/tweets/create', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsTweetsRouter.post('/tweets/update', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsTweetsRouter.post('/tweets/delete', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsTweetsRouter.post('/tweets/lottery', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterCampaignsTweetsRouter };