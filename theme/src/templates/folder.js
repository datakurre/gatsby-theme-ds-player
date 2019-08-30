import { graphql, withPrefix } from 'gatsby';
import { useEffect } from 'react';
import { navigate } from 'gatsby';
import { withPagePrefix } from '../utils';

export default ({ data, pageContext }) => {
  const slugs = data.folder.slides.map(slide =>
    withPagePrefix(pageContext.pathPrefix, slide.slug)
  );
  const prefix = withPrefix('/');
  if (slugs) {
    let previous;
    if (typeof localStorage !== 'undefined') {
      previous = localStorage.getItem('ds.location.pathname') || '';
      while (prefix !== '/' && previous.startsWith(prefix)) {
        previous = `/${previous.substr(withPrefix('/').length)}`;
      }
    }
    if (slugs.indexOf(previous) > -1) {
      useEffect(() => navigate(previous), [previous]);
    } else {
      useEffect(() => navigate(slugs[0]), [slugs]);
    }
  } else {
    useEffect(() => navigate('/404/'), []);
  }
  return null;
};

export const query = graphql`
  query($id: String!) {
    folder: ploneFolder(id: { eq: $id }) {
      slides: items {
        slug: _path
      }
    }
  }
`;
