"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./runtime-paths");
const app_factory_1 = require("./app.factory");
async function bootstrap() {
    const app = await (0, app_factory_1.createApp)();
    const port = Number(process.env.PORT || 3001);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map