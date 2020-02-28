import 'source-map-support/register';

import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';

import { twitterAuthRouter } from './routes/twitter/auth';
import { twitterFollowersRouter } from './routes/twitter/followers';
import { twitterCampaignsFollowersRouter } from './routes/twitter/campaigns/followers';
import { twitterCampaignsRetweetsRouter } from './routes/twitter/campaigns/retweets';
import { twitterCampaignsKeywordsRouter } from './routes/twitter/campaigns/keywords';

const app = express();
const server = awsServerlessExpress.createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({ origin: true }));

app.use('/twitter/auth', twitterAuthRouter);
app.use('/twitter/followers', twitterFollowersRouter);
app.use('/twitter/campains/followers', twitterCampaignsFollowersRouter);
app.use('/twitter/campains/retweets', twitterCampaignsRetweetsRouter);
app.use('/twitter/campains/keywords', twitterCampaignsKeywordsRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};