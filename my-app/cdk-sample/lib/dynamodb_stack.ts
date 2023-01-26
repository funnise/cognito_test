import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {  aws_dynamodb  } from "aws-cdk-lib"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DynamoDBStack extends cdk.Stack {
  public readonly stackProps: DynamoDBProps;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const testTable = new aws_dynamodb.Table(this, "testdb", {
      partitionKey: {
        name: "itemId",
        type: aws_dynamodb.AttributeType.STRING,
      },
      tableName: "testdb",
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    const clinicTable = new aws_dynamodb.Table(this, "clinicTable", {
      partitionKey: {
        name: "clinicId",
        type: aws_dynamodb.AttributeType.STRING,
      },
      tableName: "clinicTable",
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    this.stackProps = { 
      testTable: testTable,
      clinicTable: clinicTable,
    }  as DynamoDBProps;

    }
  }
export interface DynamoDBProps extends cdk.StackProps {
  testTable: aws_dynamodb.Table;
  clinicTable: aws_dynamodb.Table;
}
