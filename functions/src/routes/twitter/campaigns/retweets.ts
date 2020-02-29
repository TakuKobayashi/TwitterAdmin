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
const twitterCampaignsRetweetsRouter = express.Router();

twitterCampaignsRetweetsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.get('/retweets', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/create', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/update', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/delete', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/tweet', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/lottery', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.post('/retweets/extract', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsRetweetsRouter.get('/retweets/data_download', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterCampaignsRetweetsRouter };
