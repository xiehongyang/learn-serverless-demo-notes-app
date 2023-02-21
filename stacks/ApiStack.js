import {StorageStack} from "./StorageStack";
import {Api, use} from "@serverless-stack/resources";


export function ApiStack({stack, app}) {
    const {table} = use(StorageStack)

    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName
                },
            },
            authorizer: "iam"
        },
        routes: {
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