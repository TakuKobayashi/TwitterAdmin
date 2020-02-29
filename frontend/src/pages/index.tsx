import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function Index() {
  const twitterScreenName = window.localStorage.getItem('twitterScreenName');
  let redirectPath = '/dashboard';
  if (!twitterScreenName) {
    redirectPath = '/auth';
  }

  useEffect(() => {
    navigate(redirectPath);
  }),
    [];
  return <div />;
}
