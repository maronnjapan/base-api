import type app from "../src";

export const executePostRequest = async <T>(baseApp: typeof app, path: string, body?: T) => {

    return await baseApp.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }, undefined)
}


