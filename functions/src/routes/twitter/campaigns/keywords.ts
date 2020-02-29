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
const twitterCampaignsKeywordsRouter = express.Router();

twitterCampaignsKeywordsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.get('/keywords', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/create', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/update', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/delete', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/tweet', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/lottery', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.post('/keywords/extract', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterCampaignsKeywordsRouter.get('/keywords/data_download', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterCampaignsKeywordsRouter };
