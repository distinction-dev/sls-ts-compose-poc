import type { ValidatedEventAPIGatewayProxyEvent } from '@/libs/apiGateway';
import { formatJSONResponse } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  console.log('outputed var: ', process.env.CURRENT_STAGE);
  return formatJSONResponse({
    message: `Hello serviceB, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
