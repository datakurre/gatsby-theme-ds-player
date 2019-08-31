import { withPagePrefix } from '../utils';
import React, { useEffect } from 'react';
import { navigate, withPrefix } from 'gatsby-link';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export const Slide = ({ slide, folder, pathPrefix }) => {
  const current = withPagePrefix(pathPrefix, slide.slug);
  const duration = slide.duration || 10;
  const slides = folder.slides.map(slide =>
    withPagePrefix(pathPrefix, slide.slug)
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
            imgStyle={{ height: '100vh', margin: 0 }}
            fixed={slide.image.childImageSharp.fullHD}
            alt=""
          />
        </Link>
      </div>
    </>
  );
};
