"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSettingModule = void 0;
const common_1 = require("@nestjs/common");
const organization_setting_service_1 = require("./organization-setting.service");
const organization_setting_controller_1 = require("./organization-setting.controller");
let OrganizationSettingModule = class OrganizationSettingModule {
};
exports.OrganizationSettingModule = OrganizationSettingModule;
exports.OrganizationSettingModule = OrganizationSettingModule = __decorate([
    (0, common_1.Module)({
        controllers: [organization_setting_controller_1.OrganizationSettingController],
        providers: [organization_setting_service_1.OrganizationSettingService],
    })
], OrganizationSettingModule);
//# sourceMappingURL=organization-setting.module.js.map