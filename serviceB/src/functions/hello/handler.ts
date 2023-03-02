import { formatJSONResponse } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';

const hello = async (event) => {
  console.log('outputed var: ', process.env.CURRENT_STAGE);
  return formatJSONResponse({
    message: `Hello serviceB, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
