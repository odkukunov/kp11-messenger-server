/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { RegisterUserDTO } from './UsersDTOS';
import { JwtService } from '../jwt/jwt.service';
export declare class UsersService {
    private model;
    private jwtService;
    constructor(model: Model<UserDocument>, jwtService: JwtService);
    create(user: RegisterUserDTO): Promise<any>;
    login(login: string, password: string): Promise<any>;
    getByName(name: string, page: number): Promise<{
        users: (import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        isLastPage: boolean;
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private hashPassword;
    verifyToken(token: string): Promise<import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createProfile(ctxUser: User, userName: string, profile: any): Promise<{
        user: import("mongoose").LeanDocument<import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        token: string;
    }>;
    updateProfile(ctxUser: User, profile: any): Promise<{
        user: import("mongoose").LeanDocument<import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        token: string;
    }>;
}
