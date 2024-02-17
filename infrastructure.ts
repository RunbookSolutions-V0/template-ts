import * as cdk from "aws-cdk-lib";
import { ExampleStack } from "./stacks";

const MicroService: string = "Template"

const app = new cdk.App();

new ExampleStack(app, 'Example', {
    service: MicroService,
}).applyTags()