import React from 'react';
import SEO from '../components/SEO';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['twitterUser']);
  if (cookies.twitterUserId) {
    window.localStorage.setItem('twitterUserId', cookies.twitterUserId);
    removeCookie('twitterUserId');
  }

  return (
    <div>
      <SEO title="Home" keywords={['Twitter', 'Admim']} />
      <TwitterTimelineEmbed sourceType="profile" screenName="taptappun" options={{ height: 400 }} />
    </div>
  );
};
export default Home;
