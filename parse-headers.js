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

function cookie(serialized) {
  const cookies = [];
  serialized.split(';').forEach((pair) => {
    const delimiter = pair.indexOf('=');
    if (delimiter === -1) return;
    cookies.push({
      name: pair.slice(0, delimiter).trim(),
      value: pair.slice(delimiter + 1).trim(),
    });
  });
  return cookies;
}

function parseHeaders(headerSet) {
  const output = { headers: {} };
  Object.keys(headerSet).forEach((header) => {
    if (header === 'set-cookie') {
      const toParse = headerSet['set-cookie'];
      output.setCookie = toParse.map(setCookie);
    } else if (header === 'feature-policy') {
      const toParse = headerSet['feature-policy'];
      output.featurePolicy = featurePolicy(toParse);
    } else if (header === 'content-security-policy') {
      const toParse = headerSet['content-security-policy'];
      output.contentSecurityPolicy = contentSecurityPolicy(toParse);
    } else if (header === 'cookie') {
      const toParse = headerSet['cookie'];
      output.cookies = cookie(toParse);
    } else {
      output.headers[header] = headerSet[header];
    }
  });
  return output;
}

module.exports = parseHeaders;

