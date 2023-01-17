import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Stack, StackProps, aws_lambda_nodejs as lambda, aws_apigateway, Duration, aws_dynamodb  } from "aws-cdk-lib"
import { LambdaStack} from './cdk-lambda-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const app = new cdk.App();
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkSampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const userPool = new cognito.UserPool(this, "userpool", {
      userPoolName: "sample-user-pool",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // User Pool Client
    const userPoolClient = new cognito.UserPoolClient(this, "userpool-client", {
      userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });
    // table
    const dynamoTable = new aws_dynamodb.Table(this, "items", {
      partitionKey: {
        name: "itemId",
        type: aws_dynamodb.AttributeType.STRING,
      },
      tableName: "items",
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

  
  // lambda
  const helloWorld = new lambda.NodejsFunction(this, "MyLambda", {
    entry: "lambda/index.ts",
    // handler: "handler", // デフォルトのハンドラ関数名は "handler"
    // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
    timeout: Duration.minutes(15), // デフォルトは 3 秒
  })
  const postItem = new lambda.NodejsFunction(this, "postItem", {
    entry: "lambda/postItem.ts",
    // handler: "handler", // デフォルトのハンドラ関数名は "handler"
    // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
    timeout: Duration.minutes(15), // デフォルトは 3 秒
    environment: {
      TABLE_NAME: "items",
      PRIMARY_KEY: "itemId",
    },
  })
  const getItem = new lambda.NodejsFunction(this, "getItem", {
    entry: "lambda/getItem.ts",
    // handler: "handler", // デフォルトのハンドラ関数名は "handler"
    // runtime: Runtime.NODEJS_14_X, // デフォルトは Node.js 14.x
    timeout: Duration.minutes(15), // デフォルトは 3 秒
    environment: {
      TABLE_NAME: "items",
      PRIMARY_KEY: "itemId",
    },
  })
  dynamoTable.grantWriteData(postItem);
  dynamoTable.grantReadData(getItem);

  // api gateway
  const restApi = new aws_apigateway.RestApi(this, "restApi", {
    restApiName: "api-test",
    cloudWatchRole: false, // cloudwatchの設定は必要
    deployOptions: {
    // ここでロギングを行うための設定が必要
     /* loggingLevel: aws_apigateway.MethodLoggingLevel.INFO,
      dataTraceEnabled: true,
      metricsEnabled: true,*/
    },
  });

  restApi.root.addResource('helloWorld').addMethod('GET', new aws_apigateway.LambdaIntegration(helloWorld));
  const itemAPI = restApi.root.addResource('item')
  itemAPI.addMethod('POST', new aws_apigateway.LambdaIntegration(postItem));
  itemAPI.addMethod('GET', new aws_apigateway.LambdaIntegration(getItem));
  }
}
