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

twitterFollowersRouter.get('/only_followes', async (req: Request, res: Response, next: NextFunction) => {
  const onlyFollowUserIds = [];
  const followIdResponses = await twitter.get('friends/ids', { screen_name: 'taptappun', count: 5000 });
  const followIds = followIdResponses.data as { [s: string]: any }
  const followerIdResponses = await twitter.get('followers/ids', { screen_name: 'taptappun', count: 5000});
  const followerIds = followerIdResponses.data as any[]
  for(const followId of followIds.ids){
    if(!followerIds.includes(followId)){
      onlyFollowUserIds.push(followId);
    }
  }
  console.log(onlyFollowUserIds.length)
  res.json(onlyFollowUserIds);
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };