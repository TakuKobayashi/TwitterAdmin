import { config, region } from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import { twitterAuthRouter } from './routes/twitter/auth';
import { twitterFollowersRouter } from './routes/twitter/followers';
import { twitterCampaignsFollowersRouter } from './routes/twitter/campaigns/followers';
import { twitterCampaignsRetweetsRouter } from './routes/twitter/campaigns/retweets';
import { twitterCampaignsKeywordsRouter } from './routes/twitter/campaigns/keywords';

require('dotenv').config();
admin.initializeApp(config().firebase);

const app = express();

app.use('/twitter/auth', twitterAuthRouter);
app.use('/twitter/followers', twitterFollowersRouter);
app.use('/twitter/campains/followers', twitterCampaignsFollowersRouter);
app.use('/twitter/campains/retweets', twitterCampaignsRetweetsRouter);
app.use('/twitter/campains/keywords', twitterCampaignsKeywordsRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;

