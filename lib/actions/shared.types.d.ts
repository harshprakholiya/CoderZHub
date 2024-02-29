import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetQuestionParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}
export interface CreateQuestionParams {
    title : string;
    content: string
    tags: string[];
    author: Schema.Type.ObjectId | IUser
    path: string
}

