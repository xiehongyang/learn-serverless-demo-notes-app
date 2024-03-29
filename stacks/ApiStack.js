import {StorageStack} from "./StorageStack";
import {Api, use} from "@serverless-stack/resources";


export function ApiStack({stack, app}) {
    const {table} = use(StorageStack)

    const api = new Api(stack, "Api", {
        cors: true,
        defaults: {
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName,
                    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
                },
            },
            authorizer: "iam"
        },
        routes: {
            "POST /billing": "functions/billing.main",
            "POST /notes": "functions/create.main",
            "GET /notes/{id}": "functions/get.main",
            "GET /notes": "functions/list.main",
            "PUT /notes/{id}": "functions/update.main",
            "DELETE /notes/{id}": "functions/delete.main"
        }
    });

    stack.addOutputs({
        ApiEndpoint: api.url
    });

    return {
        api
    }
}