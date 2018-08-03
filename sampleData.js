const sampleData = [
  {
    "metadata": {
      "url": "/",
      "method": "POST",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "16",
        "etag": "W/\"10-EhqoRZdNVGSHLY3Ifb0sTKCvL7g\"",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "Don't post here!",
      "setCookie": [
        {
          "name": "bad",
          "value": "true",
          "Path": "/"
        }
      ],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "content-security-policy": [
          "No Content Security Policy in place."
        ],
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/login",
      "method": "POST",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 302,
      "headers": {
        "x-powered-by": "Express",
        "location": "/",
        "vary": "Accept",
        "content-type": "text/plain; charset=utf-8",
        "content-length": "23",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "Found. Redirecting to /",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/api",
      "method": "GET",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "content-type": "application/json; charset=utf-8",
        "content-length": "23",
        "etag": "W/\"17-dQtD3jXXfM9MzwmswKh4/dTDiyU\"",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "\"hi from the api route\"",
      "setCookie": [
        {
          "name": "testcookie",
          "value": "test%20value",
          "Path": "/"
        }
      ],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/secret",
      "method": "GET",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "23",
        "etag": "W/\"17-jRiGJniZy6Sn5XCmgY8kjgSFkCY\"",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "Here's the secret page!",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {
        "camera": [
          "https://other.com"
        ],
        "microphone": [
          "https://other.com"
        ]
      }
    },
    "warnings": {
      "req": {},
      "res": {
        "content-security-policy": [
          "No Content Security Policy in place."
        ],
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/routers/",
      "method": "PATCH",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "34",
        "etag": "W/\"22-BVFpSyq+xZan3gQWKW+Ei2fIHdI\"",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "express.Router is tracked as well!",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "content-security-policy": [
          "No Content Security Policy in place."
        ],
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/routers/nested/",
      "method": "DELETE",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "date": "Thu, 02 Aug 2018 05:40:44 GMT",
        "connection": "close",
        "content-length": "29"
      },
      "body": "Yup, tracking nested routers!",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/signup/",
      "method": "GET",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "x-powered-by": "Express",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close",
        "content-length": "7"
      },
      "body": "Gotten!",
      "setCookie": [],
      "contentSecurityPolicy": {
        "default-src": [
          "'self'"
        ],
        "img-src": [
          "*"
        ],
        "media-src": [
          "media1.com",
          "media2.com"
        ],
        "script-src": [
          "userscripts.example.com"
        ]
      },
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  },
  {
    "metadata": {
      "url": "/signup/",
      "method": "POST",
      "api": "n/a",
      "external": false,
      "flags": [
        "severe"
      ]
    },
    "request": {
      "headers": {},
      "body": "",
      "cookies": []
    },
    "response": {
      "statusCode": 302,
      "headers": {
        "x-powered-by": "Express",
        "location": "/",
        "vary": "Accept",
        "content-type": "text/plain; charset=utf-8",
        "content-length": "23",
        "date": "Thu, 02 Aug 2018 05:40:43 GMT",
        "connection": "close"
      },
      "body": "Found. Redirecting to /",
      "setCookie": [],
      "contentSecurityPolicy": {},
      "featurePolicy": {}
    },
    "warnings": {
      "req": {},
      "res": {
        "x-powered-by": [
          "x-powered-by header should not be sent."
        ]
      }
    }
  }
]


module.exports = sampleData;