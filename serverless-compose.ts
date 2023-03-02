const serverlessComposeConfiguration = {
  services: {
    serviceA: {
      path: './serviceA',
    },
    serviceB: {
      path: './serviceB',
      params: {
        stageName: '${serviceA.stageName}',
        authorizerId: '${serviceA.authorizerId}'
      },
      dependsOn: ['serviceA'],
    },
  },
};

module.exports = serverlessComposeConfiguration;
