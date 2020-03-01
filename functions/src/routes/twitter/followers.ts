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
  const accountsTable = new DynamoDBORM('accounts');
  //accountsTable.update(accountData)
  const onlyFollowUserIds = [];
  const twitter = setupTwit({app_only_auth: true});
  const twitterUser = await twitter.get('users/show', { screen_name: screenName });
  console.log(twitterUser.data);
  const twitterAccount = await accountsTable.findBy({account_type: twitterAdminType, uid: twitterUser.data.id_str});
  console.log(twitterAccount);
  const updated = await accountsTable.update({
    account_type: twitterAccount.account_type,
    uid: twitterAccount.uid
  }, {
    followers_count: twitterUser.data.followers_count,
    follows_count: twitterUser.data.friends_count,
    profile_url: twitterUser.data.url,
    profile_image_url: twitterUser.data.profile_image_url_https,
  })
  console.log(updated);
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
  const users = await twitter.get('users/lookup', { user_id: onlyFollowUserIds.join(",") });
  console.log(users.data);
  res.json({twitterIds: onlyFollowUserIds});
});

twitterFollowersRouter.post('/protect_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

twitterFollowersRouter.post('/unfollow_users', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello followers');
});

export { twitterFollowersRouter };
