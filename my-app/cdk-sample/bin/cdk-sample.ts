#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkSampleStack } from '../lib/cdk-sample-stack';
import { CognitoStack } from '../lib/cognito_stack';
import { ApiGateWayStack } from '../lib/apigateway_stack';
import { LambdaStack } from '../lib/lambda_stack';
import { DynamoDBStack } from '../lib/dynamodb_stack';

const app = new cdk.App();
const dynamoDBstack = new DynamoDBStack(app, 'DynamoDBStackTest', {});
const apiStack  = new ApiGateWayStack(app, 'ApiGateWayStackTest', {});
// new CognitoStack(app, 'CognitoStack', {});
new LambdaStack(app, 'LambdaStackTest', {
  restApi: apiStack.stackProps.restApi, 
  testTable: dynamoDBstack.stackProps.testTable,
  clinicTable: dynamoDBstack.stackProps.clinicTable
})