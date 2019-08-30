import React from 'react';
import { LocationProvider } from '@reach/router';

export const wrapRootElement = ({ element }) => (
  <LocationProvider>
    {({ location }) => {
      const previous = localStorage.getItem('ds.location.pathname') || '';
      if (!previous.startsWith(location.pathname)) {
        localStorage.setItem('ds.location.pathname', location.pathname);
      }
      return element;
    }}
  </LocationProvider>
);
