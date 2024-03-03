import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}


export interface GetUserByIdParams {
  userId: string;
}

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

export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  }

  export interface UpdateUserParams {
    clerkId: string;
    updateData: Partial<IUser>;
    path: string;
  }

  export interface DeleteUserParams {
    clerkId: string;
  }

