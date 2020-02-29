import { InputGroup, Button } from 'oah-ui';
import styled from 'styled-components';
import React from 'react';

import Auth from '../../components/Auth';
import SEO from '../../components/SEO';

const ORStyle = styled.section`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  .links {
    font-size: 2.5rem;
    a {
      margin: 0 1rem;
    }
  }
`;

export default function Login() {
  const onClickButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.location.href = process.env.API_ROOT_URL + '/twitter/auth/login?origin=' + window.location.origin;
  };

  return (
    <Auth title="Login" subTitle="Hello! Login with your Twitter Account!">
      <SEO title="Login" keywords={['Twitter', 'TwitterAdmin', 'application', 'react']} />
      <form>
        <InputGroup fullWidth>
          <input type="twittername" placeholder="Twitter Name" />
        </InputGroup>
        <ORStyle>
          <p>or</p>
        </ORStyle>
        <Button status="Info" type="button" shape="SemiRound" onClick={onClickButton} fullWidth>
          Sign in with Twitter
        </Button>
      </form>
    </Auth>
  );
}
