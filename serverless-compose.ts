const serverlessComposeConfiguration = {
  services: {
    serviceA: {
      path: './serviceA',
    },
    serviceB: {
      path: './serviceB',
      params: {
        FUN_ARN: '${serviceA.FUN_ARN}',
      },
      dependsOn: ['serviceA'],
    },
  },
};

module.exports = serverlessComposeConfiguration;
