module.exports = [
  {
    id: 'test-rule',
    header: 'feature-policy',
    when: (headers, type) => type === 'request',
    expect: () => false,
    fail: {
      message: 'Failed!!!!',
    },
    halt: true,
  },
];
