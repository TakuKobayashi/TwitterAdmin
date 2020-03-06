import { NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { twitterAdminType } from '../../common/twitter';

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
  const follow_cursor = req.query.follow_cursor || -1;
  const follower_cursor = req.query.follower_cursor || -1;
  const twitterAccount = res.locals.twitterAccount;
  const twitter = res.locals.twitter;
  const followIdResponses = await twitter.get('friends/ids', {
    user_id: twitterAccount.uid,
    count: 5000,
    cursor: follow_cursor,
    stringify_ids: true,
  });
  const followsData = followIdResponses.data as { [s: string]: any };
  const followIds: string[] = followsData.ids;
  const followerIdResponses = await twitter.get('followers/ids', {
    user_id: twitterAccount.uid,
    count: 5000,
    cursor: follower_cursor,
    stringify_ids: true,
  });
  const followersData = followerIdResponses.data as { [s: string]: any };
  const followerIds: string[] = followersData.ids;
  for (const followId of followIds) {
    if (!followerIds.includes(followId)) {
      onlyFollowUserIds.push(followId);
    }
  }

  res.json({
    twitterIds: onlyFollowUserIds,
    follow_next_cursor: followsData.next_cursor,
    follower_next_cursor: followersData.next_cursor,
    follow_previous_cursor: followsData.previous_cursor,
    follower_previous_cursor: followersData.previous_cursor,
  });
});

twitterFollowersRouter.post('/lookup_users', async (req: Request, res: Response, next: NextFunction) => {
  const twitterUserIds = req.body.twitterUserIds.split(',');
  const users = await twitter.get('users/lookup', { user_id: twitterUserIds.join(',') });
  console.log(users.data);
  res.json({
    users: users,
  });
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };
