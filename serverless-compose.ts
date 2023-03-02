const serverlessComposeConfiguration = {
  services: {
    serviceA: {
      path: './serviceA',
    },
    serviceB: {
      path: './serviceB',
      params: {
        stageName: 'uat',
        authorizerId: 'hfj7s2',
      },
      dependsOn: ['serviceA'],
    },
  },
};

module.exports = serverlessComposeConfiguration;
