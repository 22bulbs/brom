const {
  contentSecurityPolicy,
  cookie,
  featurePolicy,
  setCookie,
} = require('./parse-headers');

module.exports = [
  {
    //unique id for the rule. used to deactivate in config
    id:"include-csp",

    // header that the rule applies to
    header: 'content-security-policy',

    // callback function to determine when to check this rule
    when: (headers, type) => type === 'response' && headers['content-type'] && headers['content-type'].indexOf('text/html') !== -1,

    // callback function to determine if rule passes or fails
    expect: headers => headers['content-security-policy'],

    // message and flags to set if rule fails
    fail: {
      message: 'No Content-Security-Policy in place.',
      flags: ['severe'],
    },

    // message and flags to set if rule passes
    pass: {
      flags: ['csp'],
    },
  },
  // content-security-policy-rules
  {
    id:'csp-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['default-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting default-src to a wild card. Try opting for a stricter default and looser rules on specific sources.',
      flags: ['severe'],
    },
    pass: {
      flags: [],
    },
  },
  {
    id: 'csp-script-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['script-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting script-src to a wild card. This allows loading scripts from any domain, any host, and on any port.',
      flags: ['severe']
    }
  },
  {
    id: 'csp-object-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['object-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting object-src to a wild card. This allows loading plugins from any domain, any host, and on any port.',
      flags: ['severe']
    }
  },
  {
    id: 'csp-style-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['style-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting style-src to a wild card. This allows loading styles (CSS) from any domain, any host, and on any port.',
      flags: []
    }
  },
  {
    id: 'csp-img-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['img-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting img-src to a wild card. This allows loading images from any domain or host.',
      flags: []
    }
  },
  {
    id: 'csp-connect-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['connect-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting connect-src to a wild card. This allows loading connections from any domain, any host, and on any port.',
      flags: ['severe']
    }
  },
  {
    id: 'csp-font-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['font-src'][0] !== '*';
    },
    fail: {
      message: 'You are currently allowing fonts from any source, host, or domain.',
      flags: []
    }
  },
  {
    id: 'csp-media-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['media-src'][0] !== '*';
    },
    fail: {
      message: 'You are currently allowing media, such as audio or video elements, from any domain or host.',
      flags: []
    }
  },
  {
    id: 'csp-frame-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['frame-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting frame-src to a wild card. This directive has been deprecated as of CSP level 2. Please use "child-src" instead.',
      flags: []
    }
  },
  {
    id: 'csp-child-src-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['child-src'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting child-src to a wild card. This allows loading web workers and nested browsing contexts, such as <iframe>, from any domain or host.',
      flags: ['severe']
    }
  },
  {
    id: 'csp-form-action-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['form-action'][0] !== '*';
    },
    fail: {
      message: 'You are currently allowing any source to be used as an HTML form action.',
      flags: []
    }
  },
  {
    id: 'csp-frame-ancestors-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['frame-ancestors'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting frame-ancestors to a wild card. Setting this to "none" is roughly equivalent to using X-Frame-Options: DENY.',
      flags: []
    }
  },
  {
    id: 'csp-plugin-types-no-*',
    header: 'content-security-policy',
    when: (headers, type) => type === 'response' && headers['content-security-policy'],
    expect: (headers) => {
      const policy = contentSecurityPolicy(headers['content-security-policy']);
      return policy['plugin-types'][0] !== '*';
    },
    fail: {
      message: 'Avoid setting plugin-types to a wild card. This directive is used to set valid MIME types.',
      flags: []
    }
  },
  {
    id:"no-x-powered-by",
    header: 'x-powered-by',
    when: (_, type) => type === 'response',
    expect: headers => !headers['x-powered-by'],
    fail: {
      message: 'The X-Powered-By header advertises unnecessary details about your server, and should not be sent.',
      flags: ['severe'],
    },
    pass: {
      flags: [],
    },
  },
  {
    id:"include-nosniff",
    header: 'x-content-type-options',
    when: (_, type) => type === 'response',
    expect: headers => headers['x-content-type'] === 'nosniff',
    fail: {
      message: 'X-Content-Type-Options should be present on all responses, with a value of nosniff.',
      flags: ['severe'],
    },
    pass: {
      flags: [],
    },
  },
  {
    id:"include-fp",
    header: 'feature-policy',
    when: (headers, type) => type === 'response' && headers['content-type'] && headers['content-type'].indexOf('text/html') !== -1,
    expect: headers => headers['feature-policy'],
    fail: {
      message: 'Consider setting a Feature-Policy header on HTML files, to restrict device access to necessary features.',
      flags: ['severe'],
    },
    pass: {
      flags: ['fp'],
    },
  },
  {
    id:"include-x-xss-protection",
    header: 'x-xss-protection',
    when: (headers, type) => type === 'response' && headers['content-type'] && headers['content-type'].indexOf('text/html') !== -1,
    expect: headers => headers['x-xss-protection'] !== 0,
    fail: {
      message: 'While you may not need stricter XSS protection policies, there is rarely a good reason to deactivate the browser\'s default protections.',
      flags: ['severe'],
    },
    pass: {
      flags: [],
    },
  },
];

