import { NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { setupTwit } from '../../common/setup-twit';

const twitterAdminType = ['twitter', 'twitteradmin'].join(':');

const express = require('express');
const twitterFollowersRouter = express.Router();

twitterFollowersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const accountsTable = new DynamoDBORM('accounts');
  const accounts = await accountsTable.all().catch(err => {
    console.log(err);
    res.send('hello err followers');
  });
  console.log(accounts);
  res.send('hello followers');
});

twitterFollowersRouter.get('/only_follows', async (req: Request, res: Response, next: NextFunction) => {
  const screenName = req.headers.twitterscreenname;
  if(!screenName){
    res.status(400);
    res.json({ message: 'unknown twitter account' });
    return;
  }
  const onlyFollowUserIds = [];
  const twitter = setupTwit({app_only_auth: true});
  const followIdResponses = await twitter.get('friends/ids', { screen_name: screenName, count: 5000 });
  const followsData = followIdResponses.data as { [s: string]: any };
  const followIds: number[] = followsData.ids;
  const followerIdResponses = await twitter.get('followers/ids', { screen_name: screenName, count: 5000 });
  const followersData = followerIdResponses.data as { [s: string]: any };
  const followerIds: number[] = followersData.ids;
  for (const followId of followIds) {
    if (!followerIds.includes(followId)) {
      onlyFollowUserIds.push(followId);
    }
  }
  res.json({twitterIds: onlyFollowUserIds});
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };
