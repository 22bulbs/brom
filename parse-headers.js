/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */

function contentSecurityPolicy(serialized) {
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
  return serialized.split(';').reduce((policy, declaration) => {
    const tokens = declaration.trim().split(/\s+/);
    if (!tokens.length) return policy;

    const [featureName, ...targetList] = tokens;
    const feature = featureName.toLowerCase();

    const allowList = targetList.includes('*') ? ['*'] : targetList;

    policy[feature] = allowList;
    return policy;
  }, {});
}

function setCookie(serialized) {
  const [nameValue, ...unparsedAttributes] = serialized.split(';');
  const [name, value] = nameValue.split('=').map(str => str.trim());
  if (!name || value === undefined) return {};

  const cookie = { name, value };
  if (!unparsedAttributes.length) {
    return cookie;
  }

  unparsedAttributes.forEach((attribute) => {
    const delimiter = attribute.indexOf('=');
    if (delimiter !== -1) {
      const [attName, attValue] = [
        attribute.slice(0, delimiter),
        attribute.slice(delimiter + 1),
      ].map(str => str.trim());
      cookie[attName] = attValue;
    } else {
      cookie[attribute.trim()] = true;
    }
  });

  return cookie;
}

function parseHeaders(headerSet) {
  if (headerSet['set-cookie']) {
    const toParse = headerSet['set-cookie'];
    headerSet['set-cookie'] = toParse.map(setCookie);
  }
  if (headerSet['feature-policy']) {
    const toParse = headerSet['feature-policy'];
    headerSet['feature-policy'] = featurePolicy(toParse);
  }
  if (headerSet['content-security-policy']) {
    const toParse = headerSet['content-security-policy'];
    headerSet['content-security-policy'] = contentSecurityPolicy(toParse);
  }
  return headerSet;
}

module.exports = parseHeaders;

