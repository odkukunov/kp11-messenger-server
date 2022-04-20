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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const object_1 = require("../../utils/object");
const fs = require("fs");
const path = require("path");
let UsersService = class UsersService {
    constructor(model, jwtService) {
        this.model = model;
        this.jwtService = jwtService;
    }
    async create(user) {
        if (user.password !== user.passwordConfirm) {
            throw new common_1.BadRequestException('Пароли не совпадают');
        }
        user.password = await this.hashPassword(user.password);
        const createdUser = await this.model.create(user);
        const token = this.jwtService.sign(createdUser.login, createdUser.password);
        return Object.assign(Object.assign({}, (0, object_1.exclude)(createdUser.toObject(), ['password', '__v'])), { token });
    }
    async login(login, password) {
        const user = await this.model.findOne({ login });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = this.jwtService.sign(user.login, user.password);
            return Object.assign(Object.assign({}, (0, object_1.exclude)(user.toObject(), ['password', '__v'])), { token });
        }
        throw new common_1.BadRequestException('Неверный логин или пароль');
    }
    async getByName(name, page) {
        const PER_PAGE = 20;
        if (!name) {
            throw new common_1.BadRequestException('Укажите имя');
        }
        const regexpes = name.split(' ');
        const regex = regexpes.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let findFilters = {
            name: { $regex: regex, $options: 'i' },
            surname: { $regex: regex, $options: 'i' },
        };
        if (regexpes.length == 1) {
            findFilters = {
                $or: [{ name: findFilters['name'] }, { surname: findFilters['surname'] }],
            };
        }
        const users = await this.model
            .find(findFilters)
            .skip(PER_PAGE * page)
            .limit(PER_PAGE)
            .select('_id name surname avatar');
        return {
            users,
            isLastPage: users.length === 0,
        };
    }
    async getById(id) {
        const user = await this.model.findById(id).select('-password -__v');
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async verifyToken(token) {
        if (token && token.startsWith('Bearer ')) {
            const newToken = token.substring(7);
            const data = this.jwtService.unsign(newToken);
            if (data) {
                const user = await this.model.findOne({ login: data.login });
                if (user && user.password == data.password) {
                    return user;
                }
            }
        }
        return null;
    }
    async createProfile(ctxUser, userName, profile) {
        if (!profile.name || !profile.group) {
            throw new common_1.BadRequestException('Вы должны указать имя и группу');
        }
        if (userName) {
            throw new common_1.BadRequestException('Ваш профиль уже существует');
        }
        return this.updateProfile(ctxUser, profile);
    }
    async updateProfile(ctxUser, profile) {
        let token = '';
        if (profile.currentPassword && profile.newPassword) {
            if (await bcrypt.compare(profile.currentPassword, ctxUser.password)) {
                profile.password = await this.hashPassword(profile.newPassword);
                token = this.jwtService.sign(ctxUser.login, profile.password);
            }
            else {
                throw new common_1.BadRequestException('Неверный пароль');
            }
        }
        if (ctxUser.avatar && profile.avatar) {
            fs.unlink(path.resolve(__dirname, '../../../../', ctxUser.avatar), (err) => {
                console.log(err);
            });
        }
        const user = await this.model
            .findOneAndUpdate({ login: ctxUser.login }, profile, {
            new: true,
            runValidators: true,
        })
            .select('-password -__v');
        if (!user) {
            throw new common_1.NotFoundException('Аккаунт не найден');
        }
        return { user: user.toObject(), token };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, jwt_service_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map