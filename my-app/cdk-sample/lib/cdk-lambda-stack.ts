import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Stack, StackProps, aws_lambda_nodejs as lambda } from "aws-cdk-lib"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes her
  const helloWorld = new lambda.NodejsFunction(this, "MyLambda", {
    entry: "lambda/index.ts",
    // handler: "handler", // デフォルトのハンドラ関数名は "handler"
    // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
    // timeout: Duration.minutes(15), // デフォルトは 3 秒
  })
  }
}
