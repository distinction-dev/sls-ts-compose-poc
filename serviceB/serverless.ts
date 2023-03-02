/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { functions } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'sls-ts-compose-poc-serviceB',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'yarn',
    },
    stage: '${opt:stage, self:provider.stage}',
    stages: ['uat', 'prod'],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
    'serverless-plugin-aws-alerts',
    'serverless-plugin-canary-deployments', // Remove this if you want to disable Canary Deployments
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'uat',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: false, // activate to see CacheHits and Misses
    },
    logs: {
      // activate to see API Gateway logs
      restApi: {
        accessLogging: false,
        executionLogging: false,
        level: 'INFO',
        fullExecutionData: false,
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CURRENT_STAGE: '${param:stageName}',
      AUTHORIZER_ID: '${param:authorizerId}',
    },
  },
  package: {
    individually: true,
  },
  functions,
};

module.exports = serverlessConfiguration;
