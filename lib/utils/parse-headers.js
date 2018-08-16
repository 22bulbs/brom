/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */

// Designed according to CSP Level 3 https://www.w3.org/TR/CSP3/
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

function csp(serialized) {
  return contentSecurityPolicy(serialized);
}

// Designed according to WICG https://wicg.github.io/feature-policy/
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

function fp(serialized) {
  return featurePolicy(serialized);
}

// Designed according to RFC6265 https://tools.ietf.org/html/rfc6265
function setCookie(serialized) {
  const [nameValue, ...unparsedAttributes] = serialized.split(';');
  const [name, value] = nameValue.split('=').map(str => str.trim());
  if (!name || value === undefined) return {};

  const newCookie = { name, value };
  if (!unparsedAttributes.length) {
    return newCookie;
  }

  unparsedAttributes.forEach((attribute) => {
    const delimiter = attribute.indexOf('=');
    if (delimiter !== -1) {
      const [attName, attValue] = [
        attribute.slice(0, delimiter),
        attribute.slice(delimiter + 1),
      ].map(str => str.trim());
      newCookie[attName] = attValue;
    } else if (attribute.trim()) {
      newCookie[attribute.trim()] = true;
    }
  });

  return newCookie;
}

// Designed according to RFC6265 https://tools.ietf.org/html/rfc6265
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
    let toParse;
    switch (header.toLowerCase()) {
      case 'content-security-policy':
        toParse = headerSet['content-security-policy'] ||
          headerSet['Content-Security-Policy'];
        output.contentSecurityPolicy = contentSecurityPolicy(toParse);
        break;
      case 'cookie':
        toParse = headerSet.cookie || headerSet.Cookie;
        output.cookies = cookie(toParse);
        break;
      case 'feature-policy':
        toParse = headerSet['feature-policy'] || headerSet['Feature-Policy'];
        output.featurePolicy = featurePolicy(toParse);
        break;
      case 'set-cookie':
        toParse = headerSet['set-cookie'] || headerSet['Set-Cookie'];
        // Express always makes its Set-Cookie value an array of cookie strings,
        // but API users are more likely to provide a single string.
        output.setCookie = [].concat(toParse).map(setCookie);
        break;
      default:
        output.headers[header] = headerSet[header];
    }
  });

  return output;
}

Object.assign(parseHeaders, {
  contentSecurityPolicy,
  cookie,
  csp,
  featurePolicy,
  fp,
  setCookie
});

module.exports = parseHeaders;
