# brom

brom is a configurable CLI for recording HTTP transactions and improving
security practices, designed for use in local environments and CI tools.
Get your headers in order _before_ deployment.

#### Table of Contents

- [Installation](https://github.com/22bulbs/brom#installation)
- [Demo](https://github.com/22bulbs/brom#demo)
- [Usage](https://github.com/22bulbs/brom#usage)
- [Rule syntax](https://github.com/22bulbs/brom#rule-syntax)
- [Configuration](https://github.com/22bulbs/brom#configuring-brom)
- [API](https://github.com/22bulbs/brom#api)
- [FAQ](https://github.com/22bulbs/brom#faq)

## Installation

`npm install -g brom`

## Demo

This repository has a built-in brom config, so just clone, install, and
run to see brom in action. You'll need Node 6.4.0 or later, and npm.

1. Clone this repository locally
2. In the root directory, `npm install`
3. `npm install -g brom`
4. `brom`
5. brom will open the GUI in your default browser automatically. Open
   a second tab and navigate to localhost:9999 to start making/recording
   requests.

## Usage

`brom <server.js> <port> [OPTIONS]`

brom records HTTP transactions, generates configurable warnings, and
provides you with detailed information on both requests and responses. By
default, it opens a second browser tab to aid inspection with by-header
breakdowns and a variety of filters.

If you'd rather go without the GUI and just get the data:

`brom -g --write-dir=brom`

writes all transactions from a given session to a timestamped file,
assessments included.

brom recording sessions operate through two modes (which can run
simultaneously):

### Interactive mode (on by default)

brom proxies your server, recording HTTP transactions as they stream
through, and injecting a script into HTML documents to record third-party
AJAX calls.

### Automated mode (Express.js only)

`brom -a`

brom traverses Express application structures to identify all registered
routes and their supported methods, sending dumb requests to each one.
Great for check-ins and (with a bit of configuration) build processes.

## Rule syntax

While brom comes with smart defaults for assessing header practices, the
security needs of your application are unique. brom provides a rule syntax
to allow you to create your own rules. Here's a built-in rule:

```javascript
{
  id: 'no-x-powered-by', // linter name
  header: 'x-powered-by', // used to organize warnings in GUI
  when: (headers, type) => type === 'response', // when to run this rule
  expect: headers => !headers['x-powered-by'], // pass/fail statement
  fail: {
    message: `The X-Powered-By header advertises unnecessary
              details about your server, and should not be sent.`
  }
}
```

The `id` field is meant to uniquely identify rules, allowing you to tell
brom what rules to skip, and what rules should halt a build process on
failure. See [Configuring brom](https://github.com/22bulbs/brom#configuring-brom).

### when

Your `when` callback helps brom decide on which transactions to run which
tests. brom passes it a **headers** object, with each header from an HTTP
message, and a **type** string to identify the message as a request or
response.

For instance, when Content-Security-Policy headers only matter on HTML
responses:

```javascript
{
  // ...
  when: (headers, type) => (
    type === 'response' &&
    headers['content-type'].match('text/html');
  ),
  // ...
}
```

### expect

The `expect` callback represents your actual requirements: brom takes the
truthiness of the return value to indicate whether or not the transaction
failed this rule. It passes the same **headers** object as then `when`
callback.

Here's the expect callback for the same rule, to confirm that a CSP has
been provided:

```javascript
{
  // ...
  expect: headers => headers['feature-policy'],
  // ...
}
```

## Configuring brom

brom needs, at minimum, to know what local port to proxy to, and with
many settings it also needs a path to your server. If you'd rather just
type `brom`, provide a `brom.config.json` in your project's root
directory.

```javascript
{
  "server": "demo/server.js",
  "port": 3000
}
```

All CLI flags can be preconfigured here as well. In a `defaults` key
provide settings matching the longform of any flag. These settings will
_always_ be overridden by flags and arguments passed directly to the CLI:

```javascript
{
  "server": "demo/server.js",
  "port": 3000,
  "defaults": {
    "automated": true,
    "https": true,
    "preserve-caching": true,
    "write-dir": "brom-history"
  }
}
```

brom uses two lightweight servers to operate (a proxy for inspecting
transactions, and a server for aggregating results from multiple sources).
These operate on ports 9999 and 7913 respectively, but you can move them
where you like:

```javascript
{
  "proxy-port": 3001,
  "results-port": 3002
}
```

Some rules may not be relevant enough to your application to keep getting
reminders. To turn these off in your config, add an array of rule ids to
ignore:

```javascript
{
  "ignore-rules": [
    "no-x-powered-by"
  ]
}
```

Conversely, to tell brom to exit with a nonzero status code on certain
rules, add them to a "halt-on" key:

```javascript
{
  "halt-on": [
    "no-x-powered-by",
    "csp-no-*"
  ]
}
```

If you've configured your server to run HTTPS locally, brom needs to serve
HTTPS too. brom can piggyback off of the same key and certificate. Add
relative paths to the key and certificate, and fire up brom with the
`--https` flag.

```javascript
{
  "https": {
    "key": "../application/server.key",
    "cert":"../application/server.crt"
  }
}
```

## API

When writing rules, some headers are tougher to parse, so brom provides
a simple set of header parsers.

### brom.contentSecurityPolicy(string)

Parses a CSP value and returns an object, with each directive name as
a key and each directive value as an array of strings.

The **value** string must be the actual header value (everything after the
`:`).

### brom.csp(string)

Alias for `brom.contentSecurityPolicy`.

```javascript
brom.csp("default-src 'self'; img-src *; script-src userscripts.example.com");

// {
//   'default-src': ['\'self\''],
//   'img-src': ['*'],
//   'script-src': ['userscripts.example.com']
// }
```

### brom.featurePolicy(string)

Parses a Feature Policy value and returns an object. Each key is
a feature, and its value an array of whitelisted domains.

The **value** string must be the actual header value (everything after the
`:`).

### brom.fp(string)

Alias for `brom.featurePolicy`.

```javascript
brom.fp("vibrate 'none'; geolocation 'none'");

// {
//   vibrate: ['\'none\''],
//   geolocation: ['\'none\'']
// }
```

### brom.cookie(string)

Parses a `Cookie` value and returns an array of cookies. The cookie name and
value are separated into `name` and `value` keys.

The **value** string must be the actual header value (everything after the
`:`).

```javascript
brom.cookie('hello=world; foo=bar;');

// [
//   { name: 'hello', value: 'world' },
//   { name: 'foo', value: 'bar' }
// ]
```

### brom.setCookie(string)

Parses a `Set-Cookie` value and returns an object. The cookie name and
value are separated into `name` and `value` keys; the rest are separated
into key-value pairs (non-value directives like "Secure" are set to
`true`).

The **value** string must be the actual header value (everything after the
`:`).

```javascript
brom.setCookie('a=b; Path=/; Max-Age=0; Secure; HttpOnly');

// [
//   {
//     name: 'a',
//     value: 'b',
//     Path: '/',
//     'Max-Age': '0',
//     Secure: true,
//     HttpOnly: true
//   }
// ]
```

### brom(object)

Returns a new object, with `Content-Security-Policy`, `Feature-Policy`,
`Set-Cookie`, and `Cookie` headers parsed. All other headers are left
unchanged under a single `headers` key.

```javascript
const parse = require('brom');
parse({
  'Content-Security-Policy': "default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com",
  'Feature-Policy': "vibrate 'none'; geolocation 'none'",
  'Cookie': 'hello=world; foo=bar;',
  'Set-Cookie': 'a=b; Path=/; HttpOnly;',
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Length': '7913'
});

// {
//   contentSecurityPolicy: {
//     'default-src': ['\'self\''],
//     'img-src': ['*'],
//     'media-src': ['media1.com', 'media2.com'],
//     'script-src': ['userscripts.example.com']
//   },
//   cookies: [
//     { name: 'hello', value: 'world' },
//     { name: 'foo', value: 'bar' }
//   ],
//   featurePolicy: {
//     vibrate: ['\'none\''],
//     geolocation: ['\'none\'']
//   },
//   setCookie: [
//     {
//       name: 'a',
//       value: 'b',
//       Path: '/',
//       'Max-Age': '0',
//       Secure: true,
//       HttpOnly: true
//     }
//   ],
//   headers: {
//     'Content-Type': 'text/html; charset=utf-8',
//     'Content-Length': '7913'
//   }
// }
```

The **headers** object you pass in can contain any number of headers. Each
key should be a header name (everything up to the `:`), and its
corresponding value the remainder of that header string.

The only exception to this rule is your `Set-Cookie` header, which may be
either a string (representing a single cookie) or an array of strings
representing multiple cookies.

## FAQ

### Is brom for Express only?

Yes and no: brom hasn't been tested extensively on non-Node backends, but
the interactive-mode flow has no interaction with or awareness of your
server, other than the port to proxy to.

However, brom's automated mode is designed explicitly for Express servers
(off by default), and you'll need to turn off autostart (add an `-m` flag)
to tell brom not to look for a server file. Start up your server as its
own process, and run `brom <port> -m`.

### Does brom support HTTPS?

As long as you've set up local HTTPS before, brom can piggyback off of the
same certificate. See the
[Configuration](https://github.com/22bulbs/brom#configuring-brom) section
for more details on configuring HTTPS.
