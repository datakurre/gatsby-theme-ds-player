exports.createPages = async (
  { graphql, actions, reporter },
  { path = '/ds-player/', query }
) => {
  const { createPage } = actions;
  const result = query
    ? await graphql(query)
    : {
        data: {
          allDsFolder: {
            edges: [],
          },
        },
      };
  result.data.allDsFolder.edges.forEach(({ node }) => {
    createPage({
      path: `${path}${node.slug}`.replace(/\/+/g, '/'),
      component: require.resolve('./src/templates/folder.js'),
      context: {
        id: node.id,
        pathPrefix: path,
      },
    });
    for (const slide of node.slides) {
      createPage({
        path: `${path}${slide.slug}`.replace(/\/+/g, '/'),
        component: require.resolve('./src/templates/slide.js'),
        context: {
          id: slide.id,
          pathPrefix: path,
        },
      });
    }
  });
};
