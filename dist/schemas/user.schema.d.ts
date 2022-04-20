/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
export declare type UserDocument = User & Document;
export declare class User {
    login: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    phoneNumber: string;
    group: string;
    avatar: string;
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any, any>, any, any>;
