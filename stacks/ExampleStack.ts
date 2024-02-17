import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { RBSStack, RBSStackProps } from "@runbooksolutions/cdk-common"

export class ExampleStack extends RBSStack {
  constructor(scope: Construct, id: string, props?: RBSStackProps) {
    super(scope, id, props);

    // const PluginCRUDFunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'MyFunction', {
    //   functionName: 'MyFunction',
    //   runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
    //   entry: 'src/lambda/function/index.ts',
    //   handler: 'handler',
    //   loggingFormat: cdk.aws_lambda.LoggingFormat.JSON,
    // });

  }

}

