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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const data_decorator_1 = require("../../decorators/data.decorator");
const users_service_1 = require("./users.service");
const r_jsend_1 = require("r-jsend");
const object_1 = require("../../utils/object");
const auth_guard_1 = require("../guards/auth.guard");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const image_1 = require("../../utils/image");
const loginData = ['login', 'password', 'email', 'passwordConfirm'];
const profileData = ['name', 'surname', 'phoneNumber', 'group'];
const updateProfileData = [...profileData, 'email', 'currentPassword', 'newPassword'];
let UsersController = class UsersController {
    constructor(usersService, jsendSerializer) {
        this.usersService = usersService;
        this.jsendSerializer = jsendSerializer;
    }
    async register(data) {
        const createdUser = await this.usersService.create(data);
        return this.jsendSerializer
            .successResponse(Object.assign({}, createdUser))
            .get();
    }
    async login(data) {
        const user = await this.usersService.login(data.login, data.password);
        return this.jsendSerializer
            .successResponse(Object.assign({}, user))
            .get();
    }
    async auth(ctx) {
        return this.jsendSerializer.successResponse(Object.assign({}, (0, object_1.exclude)(ctx.user.toObject(), ['password', '__v']))).get();
    }
    async getUsers(ctx, query) {
        const result = await this.usersService.getByName(query['q'], query['p'] || 0);
        result.users = result.users.filter((user) => user._id.toString() != ctx.user._id);
        return this.jsendSerializer.successResponse(Object.assign({}, result)).get();
    }
    async createProfile(ctx, file, data) {
        if (file) {
            data.avatar = file.path;
        }
        const { user, token } = await this.usersService.createProfile(ctx.user, ctx.user.name, data);
        return this.jsendSerializer.successResponse(Object.assign(Object.assign({}, user), { token })).get();
    }
    async updateProfile(ctx, file, data) {
        if (file) {
            data.avatar = file.path;
        }
        data = (0, object_1.excludeEmpty)(data);
        const { user, token } = await this.usersService.updateProfile(ctx.user, data);
        return this.jsendSerializer.successResponse(Object.assign(Object.assign({}, user), { token })).get();
    }
    async getUser(id) {
        const user = await this.usersService.getById(id);
        return this.jsendSerializer.successResponse(Object.assign({}, user.toObject())).get();
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, data_decorator_1.Data)(loginData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, data_decorator_1.Data)(loginData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "auth", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', image_1.default)),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, data_decorator_1.Data)(profileData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)('/profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', image_1.default)),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, data_decorator_1.Data)(updateProfileData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, r_jsend_1.default])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map