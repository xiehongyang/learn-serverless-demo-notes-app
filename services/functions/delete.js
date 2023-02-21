import dynamodb from "../util/dynamodb.js";
import handler from "../util/handler.js";


export const main = handler(async (event) => {
   const params = {
       TableName: process.env.TABLE_NAME,
       Key: {
           userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
           noteId: event.pathParameters.id
       }
   };

   await dynamodb.delete(params);

   return {
       status: true
   };
});