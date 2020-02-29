import React from 'react';
import SEO from '../components/SEO';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Home = () => {
  const twitterScreenName = window.localStorage.getItem('twitterScreenName');
  return (
    <div>
      <SEO title="Home" keywords={['Twitter', 'Admim']} />
      <TwitterTimelineEmbed sourceType="profile" screenName={twitterScreenName} options={{ height: 400 }} />
    </div>
  );
};
export default Home;
