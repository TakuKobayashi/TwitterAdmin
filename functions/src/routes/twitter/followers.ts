import { NextFunction, Request, Response } from 'express';
import { setupTwit } from '../../common/setup-twit';

const express = require('express');
const twitterFollowersRouter = express.Router();

twitterFollowersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.get('/only_follows', async (req: Request, res: Response, next: NextFunction) => {
  const onlyFollowUserIds = [];
  const twitter = setupTwit('', '');
  const followIdResponses = await twitter.get('friends/ids', { screen_name: 'taptappun', count: 5000 });
  const followIds = followIdResponses.data as { [s: string]: any };
  const followerIdResponses = await twitter.get('followers/ids', { screen_name: 'taptappun', count: 5000 });
  const followerIds = followerIdResponses.data as any[];
  for (const followId of followIds.ids) {
    if (!followerIds.includes(followId)) {
      onlyFollowUserIds.push(followId);
    }
  }
  console.log(onlyFollowUserIds.length);
  res.json(onlyFollowUserIds);
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };
