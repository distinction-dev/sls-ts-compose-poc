const authorizer = {
  type: 'CUSTOM',
  authorizerId: '${param:authorizerId}',
};

export const functions = {
  helloA: {
    handler: 'src/functions/hello/handler.main',
    events: [
      {
        http: {
          method: 'get',
          path: 'hello',
          authorizer,
        },
      },
    ],
  },
};
