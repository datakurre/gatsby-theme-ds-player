import { navigate, withPrefix } from 'gatsby-link';
import { useEffect } from 'react';
import { withPagePrefix } from '../utils';

export const Folder = ({ folder, pathPrefix }) => {
  const prefix = withPrefix('/');
  const slugs = folder.slides.map(slide =>
    withPagePrefix(pathPrefix, slide.slug)
  );
  let to, inputs;
  if (slugs) {
    let previous;
    if (typeof localStorage !== 'undefined') {
      previous = localStorage.getItem('ds.location.pathname') || '';
      while (prefix !== '/' && previous.startsWith(prefix)) {
        previous = `/${previous.substr(withPrefix('/').length)}`;
      }
    }
    if (slugs.indexOf(previous) > -1) {
      to = previous;
      inputs = previous;
    } else {
      to = slugs[0];
      inputs = [slugs];
    }
  } else {
    to = '/404/';
    inputs = [];
  }
  useEffect(() => navigate(to), [to, inputs]);
  return null;
};
