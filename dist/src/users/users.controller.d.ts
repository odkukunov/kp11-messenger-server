/// <reference types="multer" />
import { CreateProfileDTO, LoginUserDTO, RegisterUserDTO, UpdateProfileDTO } from './UsersDTOS';
import { UsersService } from './users.service';
import JSendSerializer from 'r-jsend';
export declare class UsersController {
    private usersService;
    private jsendSerializer;
    constructor(usersService: UsersService, jsendSerializer: JSendSerializer);
    register(data: RegisterUserDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    login(data: LoginUserDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    auth(ctx: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    getUsers(ctx: any, query: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    createProfile(ctx: any, file: Express.Multer.File, data: CreateProfileDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    updateProfile(ctx: any, file: Express.Multer.File, data: UpdateProfileDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    getUser(id: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
}
