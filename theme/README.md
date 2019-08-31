# Digital signage player Gatsby theme plugin

Live demo at: https://datakurre.github.io/gatsby-theme-ds-player/ds/common-room/

## Installation

Manually add to your site

```sh
npm install --save git+https://git@github.com/datakurre/gatsby-theme-ds-player.git
```

## Example usage

```js
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
```

With non-Plone source `templates/folder` and `templates/slide` must be shadowed to override page query with expected alias mapping.
