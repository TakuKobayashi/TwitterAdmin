import { Row, Col, Card, List, ListItem, User } from 'oah-ui';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../../components/SEO';

const OnlyFollowListPage = () => {
  const [followers, setFollowers] = useState(0);
  useEffect(() => {
    const requestFunc = async () => {
      const response = await axios.get(process.env.API_ROOT_URL + '/twitter/followers/only_follows', {
        headers: {
          twitterscreenname: window.localStorage.getItem('twitterScreenName'),
        },
      }).catch(err => {
        console.log(err);
      });
      console.log(response.data);
    };
    requestFunc();
  }, []);
  const userList = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
  return (
    <>
      <SEO title="List" keywords={['OAH', 'application', 'react']} />
      <Row>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card size="Small">
            <header>Users List</header>
            <List>
              {userList.map((user, index) => (
                <ListItem key={index}>
                  <User title={user.title} name={user.name} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OnlyFollowListPage;
