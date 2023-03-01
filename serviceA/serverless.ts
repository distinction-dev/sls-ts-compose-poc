/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'sls-ts-compose-poc-serviceA',
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
    region: 'ap-south-1',
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
    },
  },
  functions: { helloA: hello, authorizer: hello },
  resources: {
    Resources: {
      configurationsTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          TableName: 'configuration-table-${self:provider.stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'pk',
              AttributeType: 'S',
            },
            {
              AttributeName: 'sk',
              AttributeType: 'S',
            },
          ],

          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          GlobalSecondaryIndexes: [
            {
              IndexName: 'index1',
              KeySchema: [
                {
                  AttributeName: 'pk',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'sk',
                  KeyType: 'RANGE',
                },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
            },
          ],
        },
      },
      TestAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          AuthorizerResultTtlInSeconds: 300,
          AuthorizerUri: {
            "Fn::Join" : ["", ["arn:aws:apigateway:", "${self:provider.region}", ":lambda:path/2015-03-31/functions/", { 'Fn::GetAtt': ['AuthorizerLambdaFunction', 'Arn'] }, "/invocations"]]
          },
          IdentitySource: 'method.request.header.Authorization',
          Name: 'Test-LambdaAuthorizer-${self:provider.stage}',
          RestApiId: 'gqli8o3eda',
          Type: 'REQUEST',
        },
      },
      apiGatewayLambdaPermissions: {
        Type: "AWS::Lambda::Permission",
        Properties: {
          FunctionName: {
            "Fn::GetAtt": [ 'AuthorizerLambdaFunction', 'Arn']
          },
          Action: 'lambda:InvokeFunction',
          Principal: {
            "Fn::GetAtt": ["", [ "apigateway.", { Ref: "AWS::URLSuffix" } ]]
          },
        },
      },
    },
    Outputs: {
      stageName: {
        Value: '${self:provider.stage}',
      },
      authorizer: {
        Value: {
          Ref: 'TestAuthorizer',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
