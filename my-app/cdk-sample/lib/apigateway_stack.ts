import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway } from "aws-cdk-lib"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiGateWayStack extends cdk.Stack {
  public readonly stackProps: ApiStackProps;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  // api gateway
  const restApi = new aws_apigateway.RestApi(this, "restApi", {
    restApiName: "sleepwell_api",
    cloudWatchRole: false, // cloudwatchの設定は必要
    deployOptions: {
    // ここでロギングを行うための設定が必要
     /* loggingLevel: aws_apigateway.MethodLoggingLevel.INFO,
      dataTraceEnabled: true,
      metricsEnabled: true,*/
    },
  });
  this.stackProps = {restApi: restApi} as ApiStackProps;
  }
}
export interface ApiStackProps extends cdk.StackProps {
  restApi: aws_apigateway.RestApi;
}
