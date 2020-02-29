import React from 'react';
import SEO from '../components/SEO';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['twitterUser']);
  if (cookies.twitterUserId && cookies.twitterScreenName) {
    window.localStorage.setItem('twitterUserId', cookies.twitterUserId);
    window.localStorage.setItem('twitterScreenName', cookies.twitterScreenName);
    removeCookie('twitterUserId');
    removeCookie('twitterScreenName');
  }

  const twitterScreenName = window.localStorage.getItem("twitterScreenName");
  return (
    <div>
      <SEO title="Home" keywords={['Twitter', 'Admim']} />
      <TwitterTimelineEmbed sourceType="profile" screenName={twitterScreenName} options={{ height: 400 }} />
    </div>
  );
};
export default Home;
