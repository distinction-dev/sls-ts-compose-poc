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
    },
  },
};

module.exports = serverlessComposeConfiguration;
