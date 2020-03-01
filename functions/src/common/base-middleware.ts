import { RequestHandler, NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { twitterAdminType, setupTwit } from './twitter';

export async function authTwitterUser(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/twitter/auth/')) {
    next();
    return;
  }
  const accountsTable = new DynamoDBORM('accounts');
  const uid = req.headers.twitteruserid;
  if (uid) {
    const twitterAccount = await accountsTable.findBy({ account_type: twitterAdminType, uid: uid });
    const twitter = setupTwit({ access_token: twitterAccount.access_token, access_token_secret: twitterAccount.access_token_secret });
    res.locals.twitterAccount = twitterAccount;
    res.locals.twitter = twitter;
  } else {
    const screenName = req.headers.twitterscreenname;
    if (!screenName) {
      res.status(400);
      res.json({ message: 'unknown twitter account' });
      return;
    }
    const twitter = setupTwit({ app_only_auth: true });
    const twitterUserResponse = await twitter.get('users/show', { screen_name: screenName });
    const twitterUser = twitterUserResponse.data;
    const twitterAccount = await accountsTable.findBy({ account_type: twitterAdminType, uid: twitterUser.id_str });
    res.locals.twitterAccount = twitterAccount;
    res.locals.twitter = twitter;
  }
  next();
}
