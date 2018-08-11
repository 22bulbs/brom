# brom

 brom is a configurable CLI for recording HTTP transactions and improving
 security practices, designed for use in local environments and CI tools.
 Get your headers in order _before_ deployment.

## Installation

`npm install -g brom`

## Demo

This repository has a built-in brom config, so just clone, install, and
run to see brom in action.

1. Clone this repository locally
2. `npm install`
3. `brom` (you'll need to install this globally, or on Unix-y systems you
   can simply run `lib/index.js`)

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
  id: 'no-x-powered-by', // linter name (optional)
  header: 'x-powered-by', // where to display in UI (optional)
  when: (headers, type) => type === 'response', // when to run this rule
  expect: headers => !headers['x-powered-by'], // pass/fail statement
  fail: {
    message: 'The X-Powered-By header advertises unnecessary details about your server, and should not be sent.',
    flags: ['severe']
  }
  pass: {
    flags: []
  }
}
```

## Configuring brom

brom needs, at the minimum, to know what local port to proxy to, and with
many settings it also needs a path to your server. If you'd rather just
type `brom`, provide a `brom.config.json` in your project's root
directory.

```javascript
{
  "server": "demo/server.js",
  "port": 3000
}
```

All flags can be preconfigured here as well. In a `defaults` key provide
settings matching the longform of any flag. These settings will _always_
be overridden by flags and arguments passed directly to the CLI:

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
reminders. To turn these off in your config:

```javascript
{
  "ignore-rules": [
    "no-x-powered-by"
  ]
}
```
