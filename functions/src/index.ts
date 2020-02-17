import { config, region } from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import { twitterAuthRouter } from './routes/twitter/auth';
import { twitterFollowersRouter } from './routes/twitter/followers';
import { twitterCampaignsFollowersRouter } from './routes/twitter/campaigns/followers';
import { twitterCampaignsTweetsRouter } from './routes/twitter/campaigns/tweets';

require('dotenv').config();
admin.initializeApp(config().firebase);

const app = express();

app.use('/twitter/auth', twitterAuthRouter);
app.use('/twitter/followers', twitterFollowersRouter);
app.use('/twitter/campains/followers', twitterCampaignsFollowersRouter);
app.use('/twitter/campains/tweets', twitterCampaignsTweetsRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;

