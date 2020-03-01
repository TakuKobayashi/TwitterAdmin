import { RequestHandler, NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { setupTwit } from './setup-twit';
import * as Twit from 'twit';

export const twitterAdminType = ['twitter', 'twitteradmin'].join(':');

interface PromiseRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

function wrap(fn: PromiseRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}

export async function authTwitterUser(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/twitter/auth/')) {
    next();
    return;
  }
  const accountsTable = new DynamoDBORM('accounts');
  const uid = req.headers.twitteruserid;
  let twitterAccount;
  if (uid) {
    twitterAccount = await accountsTable.findBy({ account_type: twitterAdminType, uid: uid });
  } else {
    const screenName = req.headers.twitterscreenname;
    if (!screenName) {
      res.status(400);
      res.json({ message: 'unknown twitter account' });
      next();
      return;
    }
    const twitter = setupTwit({ app_only_auth: true });
    const twitterUserResponse = await twitter.get('users/show', { screen_name: screenName });
    const twitterUser = twitterUserResponse.data;
    twitterAccount = await accountsTable.findBy({ account_type: twitterAdminType, uid: twitterUser.id_str });
  }
  if (twitterAccount) {
    res.locals.twitterAccount = twitterAccount;
    next();
  } else {
    res.redirect('/twitter/auth/login');
  }
}
