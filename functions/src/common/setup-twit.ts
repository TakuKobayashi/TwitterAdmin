import * as Twit from 'twit';

export function setupTwit(access_token: string, access_token_secret: string) {
  const twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token: access_token,
    access_token_secret: access_token_secret,
  });
  return twitter;
}
