import React from 'react';
import SEO from '../components/SEO';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const Home = () => {
  return (
    <div>
      <SEO title="Home" keywords={['OAH', 'application', 'react']} />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="taptappun"
        options={{height: 400}}
      />
    </div>
  );
};
export default Home;
