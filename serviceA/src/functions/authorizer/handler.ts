import { middyfy } from '@/libs/lambda';
import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

const allowPolicy = (methodArn) => {
  return {
    principalId: 'apigateway.amazonaws.com',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: methodArn,
        },
      ],
    },
  };
};

const authorizer = async (event: APIGatewayRequestAuthorizerEvent) => {
  const { methodArn } = event;
  const getMethod = event.httpMethod + event.resource;
  console.log(event.methodArn);

  // if authentication is not required
  return allowPolicy(methodArn);
};

export const main = middyfy(authorizer);
