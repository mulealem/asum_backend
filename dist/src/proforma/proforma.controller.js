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
exports.ProformaController = void 0;
const common_1 = require("@nestjs/common");
const proforma_service_1 = require("./proforma.service");
const create_proforma_dto_1 = require("./dto/create-proforma.dto");
const update_proforma_dto_1 = require("./dto/update-proforma.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const proforma_entity_1 = require("./entities/proforma.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProformaController = class ProformaController {
    constructor(proformaService) {
        this.proformaService = proformaService;
    }
    create(dto, req) {
        return this.proformaService.create(dto, req.user.userId);
    }
    findAll() {
        return this.proformaService.findAll();
    }
    search(query) {
        return this.proformaService.filter(query);
    }
    findOne(id) {
        return this.proformaService.findOne(id);
    }
    getConvertData(id) {
        return this.proformaService.getConvertData(id);
    }
    update(id, dto) {
        return this.proformaService.update(id, dto);
    }
    send(id) {
        return this.proformaService.send(id);
    }
    cancel(id) {
        return this.proformaService.cancel(id);
    }
    markConverted(id, orderId) {
        return this.proformaService.markConverted(id, orderId);
    }
    remove(id) {
        return this.proformaService.remove(id);
    }
    enable(id) {
        return this.proformaService.enable(id);
    }
    disable(id, req) {
        return this.proformaService.disable(id, req.user.userId);
    }
};
exports.ProformaController = ProformaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_proforma_dto_1.CreateProformaSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(proforma_entity_1.ProformaParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/convert-data'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "getConvertData", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(update_proforma_dto_1.UpdateProformaSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/send'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "send", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)(':id/mark-converted'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "markConverted", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProformaController.prototype, "disable", null);
exports.ProformaController = ProformaController = __decorate([
    (0, common_1.Controller)('proforma'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [proforma_service_1.ProformaService])
], ProformaController);
//# sourceMappingURL=proforma.controller.js.map