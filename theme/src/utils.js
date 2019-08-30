export const withPagePrefix = (prefix, slug) =>
  `${prefix}${slug}`.replace(/\/+/g, '/');
