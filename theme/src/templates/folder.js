import React from 'react';
import { graphql } from 'gatsby';
import { Folder } from '../components/Folder';

export default ({ data, pageContext }) => (
  <Folder folder={data.folder} pathPrefix={pageContext.pathPrefix} />
);

export const query = graphql`
  query($id: String!) {
    folder: ploneFolder(id: { eq: $id }) {
      slides: items {
        slug: _path
      }
    }
  }
`;
