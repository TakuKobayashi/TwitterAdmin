import { NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { setupTwit } from '../../common/setup-twit';
import { twitterAdminType } from '../../common/base-request';

const express = require('express');
const twitterFollowersRouter = express.Router();

twitterFollowersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const accountsTable = new DynamoDBORM('accounts');
  const accounts = await accountsTable.all().catch((err) => {
    console.log(err);
    res.send('hello err followers');
  });
  console.log(accounts);
  console.log(req.originalUrl);
  res.send('hello followers');
});

twitterFollowersRouter.get('/only_follows', async (req: Request, res: Response, next: NextFunction) => {
  const onlyFollowUserIds = [];
  const twitterAccount = res.locals.twitterAccount;
  const twitter = setupTwit({ access_token: twitterAccount.access_token, access_token_secret: twitterAccount.access_token_secret });
  const followIdResponses = await twitter.get('friends/ids', { user_id: twitterAccount.uid, count: 5000 });
  const followsData = followIdResponses.data as { [s: string]: any };
  const followIds: number[] = followsData.ids;
  const followerIdResponses = await twitter.get('followers/ids', { user_id: twitterAccount.uid, count: 5000 });
  const followersData = followerIdResponses.data as { [s: string]: any };
  const followerIds: number[] = followersData.ids;
  for (const followId of followIds) {
    if (!followerIds.includes(followId)) {
      onlyFollowUserIds.push(followId);
    }
  }
  //  const users = await twitter.get('users/lookup', { user_id: onlyFollowUserIds.join(',') });
  //  console.log(users.data);
  res.json({ twitterIds: onlyFollowUserIds });
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };
