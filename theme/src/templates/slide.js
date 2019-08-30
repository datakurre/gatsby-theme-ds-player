import React from 'react';
import { useEffect } from 'react';
import { graphql, navigate, Link, withPrefix } from 'gatsby';
import Img from 'gatsby-image';
import { withPagePrefix } from '../utils';

import '../styles/index.css';

export default ({ data, pageContext }) => {
  const current = withPagePrefix(pageContext.pathPrefix, data.slide.slug);
  const duration = data.slide.duration || 10;
  const slides = data.folder.slides.map(slide =>
    withPagePrefix(pageContext.pathPrefix, slide.slug)
  );
  const next =
    slides.indexOf(current) + 1 < slides.length
      ? slides.indexOf(current) + 1
      : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (next === 0) {
        window.location = withPrefix(slides[next]) + '?' + new Date().getTime();
      } else {
        navigate(slides[next]);
      }
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, slides, next]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <Link to={slides[next]}>
          <Img
            style={{ height: '100vh', minWidth: '100%', maxWidth: '100%' }}
            imgStyle={{ height: '100vh', objectFit: 'contain', margin: 0 }}
            objectFit="contain"
            durationFadeIn={200}
            fixed={data.slide.image.childImageSharp.fullHD}
            alt=""
          />
        </Link>
      </div>
    </>
  );
};

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
