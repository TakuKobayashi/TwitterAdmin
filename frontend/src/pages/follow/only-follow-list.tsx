import { Row, Col, Card, List, ListItem, User } from 'oah-ui';
import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';

const OnlyFollowListPage = () => {
  const [followers, setFollowers] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData);
        setFollowers(resultData.stargazers_count)
      }) // set data for the number of stars
  }, [])
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
