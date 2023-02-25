import {StorageStack} from "../StorageStack";
import {getStack, App} from "@serverless-stack/resources";
import {Template} from "aws-cdk-lib/assertions";
import {test} from "vitest";

test("Test StorageStack", () => {
   const app = new App();

   app.stack(StorageStack);

   const template = Template.fromStack(getStack(StorageStack));
   template.hasResourceProperties("AWS::DynamoDB::Table", {
       BillingMode: "PAY_PER_REQUEST"
   });
});