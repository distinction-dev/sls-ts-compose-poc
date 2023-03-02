export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: {
          maxAge: 3600,
        },
        authorizer: {
          type: 'CUSTOM',
          authorizerId: process.env.AUTHORIZER_ID,
        },
      },
    },
  ],
};
