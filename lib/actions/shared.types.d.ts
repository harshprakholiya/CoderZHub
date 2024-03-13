import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface CreateAnswerParams {
  content: string;
  author: string; 
  question: string; 
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
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

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
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


  export interface GetQuestionByIdParams {
    questionId: string;
  }
  
  export interface QuestionVoteParams {
    questionId: string;
    userId: string;
    hasUpvoted: boolean;
    hasDownvoted: boolean; 
    path: string;
  }


  export interface GetAllTagsParams {
    page?: number;
    pageSize?: number;
    filter?: string;
    searchQuery?: string;
  }