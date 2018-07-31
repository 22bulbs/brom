/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */

function csp(serialized) {
  return serialized.split(';').reduce((policy, token) => {
    const trimmedToken = token.trim();
    if (!token) return policy;

    const [directiveName, ...directiveValue] = trimmedToken.split(/\s+/);
    if (policy[directiveName]) {
      console.warn('Found and ignored duplicate directive name');
      return policy;
    }

    policy[directiveName] = directiveValue;
    return policy;
  }, {});
}

function featurePolicy(serialized) {
  const features = [
    'accelerometer',
    'ambient-light-sensor',
    'autoplay',
    'camera',
    'encrypted-media',
    'fullscreen',
    'geolocation',
    'gyroscope',
    'magnetometer',
    'microphone',
    'midi',
    'payment',
    'picture-in-picture',
    'speaker',
    'usb',
    'vr',
  ];

  return serialized.split(';').reduce((policy, declaration) => {
    const tokens = declaration.trim().split(/\s+/);
    if (!tokens.length) return policy;

    const [featureName, ...targetList] = tokens;
    const feature = featureName.toLowerCase();
    if (!features.includes(feature)) return policy;

    const allowList = targetList.includes('*') ? '*' : targetList;

    policy[feature] = allowList;
    return policy;
  }, {});
}


module.exports = {
  csp,
  featurePolicy,
};

