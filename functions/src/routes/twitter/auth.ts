import { NextFunction, Request, Response } from 'express';
import { DynamoDBORM } from 'node-dynamodb-orm';
import { setupTwit, twitterAdminType } from '../../common/twitter';
import { AccountStates } from '../../common/enums/account-states';
import axios from 'axios';

const crypto = require('crypto');
const express = require('express');
const twitterAuthRouter = express.Router();
const querystring = require('querystring');

const twitterRequestTokenUrl = 'https://api.twitter.com/oauth/request_token';
const oauthCallbackUrl = 'http://localhost:3000/twitter/auth/callback';

twitterAuthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello auth');
});

twitterAuthRouter.get('/login', async (req: Request, res: Response, next: NextFunction) => {
  const origin = req.query.origin;
  if (origin) {
    res.cookie('redirectorigin', origin);
  } else {
    res.status(400);
    res.json({ message: 'origin query is invalid.' });
    return;
  }
  const params = requestTokenTwitterParams();
  const signatureString = signature(encodeURIComponent(sortJoinParamsString(params, '&')));
  params.oauth_signature = encodeURIComponent(signatureString);
  const oauthString = sortJoinParamsString(params, ',');
  const response = await axios
    .post(twitterRequestTokenUrl, null, {
      headers: {
        Authorization: 'OAuth ' + oauthString,
      },
    })
    .catch((err) => {
      res.send('error');
    });
  const token = response.data.match(/[0-9a-zA-Z¥_]+&/)[0].replace(/&/g, '');
  res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + token);
});

twitterAuthRouter.post('/login_from_screen_name', async (req: Request, res: Response, next: NextFunction) => {
  const twitter = setupTwit({ app_only_auth: true });
  const twitterUserResponse = await twitter.get('users/show', { screen_name: req.body.screen_name });
  const twitterUser = twitterUserResponse.data;
  const accountData = {
    account_type: twitterAdminType,
    uid: twitterUser.id_str,
    account_state: AccountStates.stakeholders,
    screen_name: twitterUser.screen_name,
    followers_count: twitterUser.followers_count,
    follows_count: twitterUser.friends_count,
    profile_url: twitterUser.url,
    profile_image_url: twitterUser.profile_image_url_https,
  };
  const account = await accountsTable.create(accountData);
  res.json(account);
});

twitterAuthRouter.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
  const accountsTable = new DynamoDBORM('accounts');
  const response = await axios.post('https://api.twitter.com/oauth/access_token?', sortJoinParamsString(req.query, '&')).catch((err) => {
    next(err);
  });
  const accessTokenData = querystring.parse(response.data);
  const cookies = req.cookies;
  res.cookie('twitterUserId', accessTokenData.user_id);
  res.cookie('twitterScreenName', accessTokenData.screen_name);
  res.clearCookie('redirectorigin');
  //{"oauth_token":"...","oauth_token_secret":"...","user_id":"...","screen_name":"..."}
  const twitter = setupTwit({ access_token: accessTokenData.oauth_token, access_token_secret: accessTokenData.oauth_token_secret });
  const twitterUserResponse = await twitter.get('users/show', { user_id: accessTokenData.user_id });
  const twitterUser = twitterUserResponse.data;
  const accountData = {
    account_type: twitterAdminType,
    uid: accessTokenData.user_id,
    account_state: AccountStates.members,
    screen_name: accessTokenData.screen_name,
    access_token: accessTokenData.oauth_token,
    access_token_secret: accessTokenData.oauth_token_secret,
    followers_count: twitterUser.followers_count,
    follows_count: twitterUser.friends_count,
    profile_url: twitterUser.url,
    profile_image_url: twitterUser.profile_image_url_https,
  };
  await accountsTable.create(accountData);
  res.redirect(cookies.redirectorigin);
});

function requestTokenTwitterParams(): { [s: string]: string } {
  const date = new Date();
  const results: { [s: string]: string } = {};
  const params: { [s: string]: string | number | boolean } = {
    oauth_callback: oauthCallbackUrl,
    oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(date.getTime() / 1000),
    oauth_nonce: date.getTime(),
    oauth_version: '1.0',
  };
  Object.keys(params).forEach((item) => {
    results[item] = encodeURIComponent(params[item]);
  });
  return results;
}

function sortJoinParamsString(requestParams: { [s: string]: string }, joinString: string): string {
  const params = Object.keys(requestParams).map((item) => {
    return item + '=' + requestParams[item];
  });
  params.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return params.join(joinString);
}

function signature(queryString: string): string {
  const dataOfSign = encodeURIComponent('POST') + '&' + encodeURIComponent(twitterRequestTokenUrl) + '&' + queryString;
  return crypto
    .createHmac('sha1', encodeURIComponent(process.env.TWITTER_CONSUMER_SECRET!) + '&')
    .update(dataOfSign)
    .digest('base64');
}

export { twitterAuthRouter };
