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
