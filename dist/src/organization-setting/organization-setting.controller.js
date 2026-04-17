"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSettingController = void 0;
const common_1 = require("@nestjs/common");
const organization_setting_service_1 = require("./organization-setting.service");
const update_organization_setting_dto_1 = require("./dto/update-organization-setting.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let OrganizationSettingController = class OrganizationSettingController {
    constructor(organizationSettingService) {
        this.organizationSettingService = organizationSettingService;
    }
    get() {
        return this.organizationSettingService.get();
    }
    update(dto, req) {
        dto.updatedById = req.user.userId;
        return this.organizationSettingService.upsert(dto);
    }
};
exports.OrganizationSettingController = OrganizationSettingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationSettingController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(update_organization_setting_dto_1.UpdateOrganizationSettingSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_organization_setting_dto_1.UpdateOrganizationSettingDto, Object]),
    __metadata("design:returntype", void 0)
], OrganizationSettingController.prototype, "update", null);
exports.OrganizationSettingController = OrganizationSettingController = __decorate([
    (0, common_1.Controller)('organization-setting'),
    __metadata("design:paramtypes", [organization_setting_service_1.OrganizationSettingService])
], OrganizationSettingController);
//# sourceMappingURL=organization-setting.controller.js.map