/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
const { shake, minimumMatch, mergeAssign } = require('../utils/utils');

function formatMethods(methods) {
  return Object.keys(methods)
    .filter(m => methods[m])
    .map(str => str.toUpperCase());
}

function findExpressRoutes(stack) {
  // Separate simple layers and express.Router layers
  const { routes, routers } = shake(stack, {
    routes: layer => layer.route,
    routers: layer => layer.name === 'router',
  });

  // Catalog simple layers and their supported methods
  const foundRoutes = {};
  routes.forEach((layer) => {
    const { route: { path, methods } } = layer;

    const newRoute = {};
    newRoute[path] = formatMethods(methods);

    mergeAssign(foundRoutes, newRoute);
  });

  // Express routers are structured as "miniature applications"
  // and can be treated as such
  if (routers.length) {
    routers.forEach((layer) => {
      const topPath = minimumMatch(layer.regexp);
      const deepRoutes = findExpressRoutes(layer.handle.stack);

      const newRoutes = {};
      Object.keys(deepRoutes).forEach((path) => {
        newRoutes[`${topPath}${path}`] = deepRoutes[path];
      });

      mergeAssign(foundRoutes, newRoutes);
    });
  }

  return foundRoutes;
}


module.exports = findExpressRoutes;
