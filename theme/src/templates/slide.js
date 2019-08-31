import React from 'react';
import { graphql } from 'gatsby';

import '../styles/index.css';
import { Slide } from '../components/Slide';

export default ({ data, pageContext }) => (
  <Slide
    slide={data.slide}
    folder={data.folder}
    pathPrefix={pageContext.pathPrefix}
  />
);

export const query = graphql`
  query($id: String!) {
    slide: ploneImage(id: { eq: $id }) {
      slug: _path
      image {
        childImageSharp {
          fullHD: fixed(width: 1920) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    folder: ploneFolder(items: { elemMatch: { _id: { eq: $id } } }) {
      slides: items {
        slug: _path
      }
    }
  }
`;
