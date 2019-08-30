/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-plone',
      options: {
        baseUrl: 'http://localhost:8080/Plone/',
        logLevel: 'DEBUG',
      },
    },
    // gatsby-source-filesystem must be configured
    // to allow Plone images and files to have
    // publicURL and be downloadable from the gatsby site
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: 'gatsby-theme-ds-player',
      options: {
        path: '/ds/',
        query: `
{
  allDsFolder: allPloneFolder {
    edges {
      node {
        id: id
        slug: _path
        slides: items {
          id: _id
          slug: _path
        }
      }
    }
  }
}
      `,
      },
    },
  ],
};
