import { config, region } from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import { twitterAuthRouter } from './routes/twitter/auth';
import { twitterFollowersRouter } from './routes/twitter/followers';

require('dotenv').config();
admin.initializeApp(config().firebase);

const app = express();

app.use('/twitter/auth', twitterAuthRouter);
app.use('/twitter/followers', twitterFollowersRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;

