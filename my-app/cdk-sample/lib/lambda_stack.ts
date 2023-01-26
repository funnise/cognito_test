import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb, aws_lambda_nodejs as lambda, Duration } from "aws-cdk-lib"
import { ApiStackProps } from './apigateway_stack'
import { aws_apigateway } from "aws-cdk-lib"

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    const api =  props.restApi.root;
    const testTable = props.testTable;
    const clinicTable = props.clinicTable;
    
    const helloWorld = new lambda.NodejsFunction(this, "MyLambda", {
      entry: "lambda/index.ts",
      // handler: "handler", // デフォルトのハンドラ関数名は "handler"
      // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
      // timeout: Duration.minutes(15), // デフォルトは 3 秒
    })
    const postItem = new lambda.NodejsFunction(this, "postItem", {
      entry: "lambda/postItem.ts",
      // handler: "handler", // デフォルトのハンドラ関数名は "handler"
      // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
      timeout: Duration.minutes(15), // デフォルトは 3 秒
      environment: {
        TABLE_NAME: "clinicTable",
        PRIMARY_KEY: "clinicId",
      },
    });
    const getItem = new lambda.NodejsFunction(this, "getItem", {
      entry: "lambda/getItem.ts",
      // handler: "handler", // デフォルトのハンドラ関数名は "handler"
      // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
      timeout: Duration.minutes(15), // デフォルトは 3 秒
      environment: {
        TABLE_NAME: "clinicTable",
        PRIMARY_KEY: "clinicId",
      },
    });

   
    testTable.grantFullAccess(postItem);
    testTable.grantFullAccess(getItem);
    clinicTable.grantWriteData(postItem);
    clinicTable.grantReadData(getItem);
    // bin配下のファイルを経由して受け取ったAPI GatewayのConstructsにLambdaを紐づける
    api.addResource('test202301').addMethod("GET", new aws_apigateway.LambdaIntegration(helloWorld));
    const apiItem = api.addResource('item');
    apiItem.addMethod('POST', new aws_apigateway.LambdaIntegration(postItem));
    apiItem.addMethod('GET', new aws_apigateway.LambdaIntegration(getItem));
  }
}

export interface LambdaStackProps extends cdk.StackProps {
  testTable: cdk.aws_dynamodb.Table;
  clinicTable: cdk.aws_dynamodb.Table;
  restApi: cdk.aws_apigateway.RestApi;
}