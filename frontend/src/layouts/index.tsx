import React, { useState, useRef } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
  SidebarRefObject,
} from 'oah-ui';
import icons from 'oah-eva-icon';
import { useCookies } from 'react-cookie';

import Header from './Header';
import SimpleLayout from './SimpleLayout';
import SidebarCustom from './Sidebar';

const LayoutPage: React.FC<{ pageContext: { layout: string } }> = ({ children, pageContext }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('dark');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject>(null);

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
  };

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const [cookies, setCookie, removeCookie] = useCookies(['twitterUser']);
  if (cookies.twitterUserId && cookies.twitterScreenName) {
    window.localStorage.setItem('twitterUserId', cookies.twitterUserId);
    window.localStorage.setItem('twitterScreenName', cookies.twitterScreenName);
    removeCookie('twitterUserId');
    removeCookie('twitterScreenName');
  }

  return (
    <ThemeProvider theme={themes(theme, dir)}>
      <>
        <SimpleLayout />
        <Layout evaIcons={icons} dir={dir} windowMode className={pageContext.layout === 'auth' ? 'auth-layout' : ''}>
          {pageContext.layout !== 'auth' && (
            <Header
              dir={dir}
              changeDir={changeDir}
              changeTheme={changeTheme}
              toggleSidebar={() => sidebarRef.current?.toggle()}
            />
          )}
          <LayoutContainer>
            {pageContext.layout !== 'auth' && <SidebarCustom ref={sidebarRef} />}
            <LayoutContent>
              <LayoutColumns>
                <LayoutColumn className="main-content">{children}</LayoutColumn>
              </LayoutColumns>
              {pageContext.layout !== 'auth' && <LayoutFooter>Footer</LayoutFooter>}
            </LayoutContent>
          </LayoutContainer>
        </Layout>
      </>
    </ThemeProvider>
  );
};

export default LayoutPage;
