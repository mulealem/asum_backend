"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("../src/runtime-paths");
const express_1 = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const app_factory_1 = require("../src/app.factory");
let cachedServer;
async function getServer() {
    if (cachedServer) {
        return cachedServer;
    }
    const server = (0, express_1.default)();
    const app = await (0, app_factory_1.createApp)(new platform_express_1.ExpressAdapter(server));
    await app.init();
    cachedServer = server;
    return cachedServer;
}
async function handler(req, res) {
    const server = await getServer();
    return server(req, res);
}
//# sourceMappingURL=index.js.map