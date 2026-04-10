"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const pagination_interceptor_1 = require("./interceptors/pagination.interceptor");
const request_logging_interceptor_1 = require("./interceptors/request-logging.interceptor");
function setupSwagger(app) {
    if (process.env.ENABLE_SWAGGER === 'false') {
        return;
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Inventory API')
        .setDescription('Inventory management API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
}
async function createApp(adapter) {
    const app = adapter
        ? await core_1.NestFactory.create(app_module_1.AppModule, adapter)
        : await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalInterceptors(new request_logging_interceptor_1.RequestLoggingInterceptor(), new pagination_interceptor_1.PaginationInterceptor());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    setupSwagger(app);
    return app;
}
//# sourceMappingURL=app.factory.js.map