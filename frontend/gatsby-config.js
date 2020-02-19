/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: 'TwitterAdmin',
    description: 'Twitter Admin dashboard and Supporting Market tools',
    author: 'TakuKobayashi',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    `gatsby-plugin-layout`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'TwitterAdmin',
        short_name: 'TA',
        start_url: '/dashboard',
        display: 'minimal-ui',
        icon: 'src/images/OAH.png', // This path is relative to the root of the site.
      },
    },
  ],
};
