const serverlessComposeConfiguration = {
  services: {
    serviceA: {
      path: './serviceA',
    },
    serviceB: {
      path: './serviceB',
      params: {
        FUN_ARN: '${serviceA.funArn}',
      },
      dependsOn: ['serviceA'],
    },
  },
};

module.exports = serverlessComposeConfiguration;
