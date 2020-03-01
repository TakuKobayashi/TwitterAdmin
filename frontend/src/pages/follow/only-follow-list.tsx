import { Row, Col, Card, List, ListItem, User, Checkbox } from 'oah-ui';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../../components/SEO';

const OnlyFollowListPage = () => {
  const onChangeCheckbox = (isChecked: boolean, user: any) => {
    console.log(isChecked)
    console.log(user)
    // value will be true or false
  };

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
        <Col breakPoint={{ xs: 12, md: 12 }}>
          <Card size="Large">
            <header>Users List</header>
            <List>
              {userList.map((user, index) => (
                <ListItem key={index}>
                  <Checkbox status="Success" onChange={(isChecked: boolean) => onChangeCheckbox(isChecked, user)}>
                  <User title={user.title} name={user.name} image={"url(https://pbs.twimg.com/profile_images/940479838854377473/_Exr3_lx_200x200.jpg)"} />
                  </Checkbox>
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
