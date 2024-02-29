"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";


export async function deleteUser(params: DeleteUserParams){
    try {
        connectToDatabase();
        const { clerkId } = params;
        const user = await User.findOneAndDelete({clerkId}) 

        if(!user) {
            throw new Error("User not found");
        }

        // Delete user from database
        
        // const userQuestionIds = await Question.find({author: user._id}).distinct('_id')
        
        // Delete user Questions
        
        await Question.deleteMany({author: user._id});
        // TODO: delete Questions, answers, comments, etc.

        const deletedUser = await User.findByIdAndDelete(user._id);

        return deletedUser;

         
    } catch (error) {
        console.log(`Error deleting user: ${error}`);
        throw error;
    }
}


export async function updateUser(params: UpdateUserParams) {

    try {
        connectToDatabase();
        const { clerkId, updateData, path } = params;
        await User.findOneAndUpdate({clerkId}, updateData, {new: true});
        revalidatePath(path);

    } catch (error) {
        console.log(`Error updating user: ${error}`)
        throw error;
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();
        const newUser = new User(userData);
        return newUser;

    } catch (error) {
       console.log(`Error creating user: ${error}`); 
       throw error;
    }
}

export async function getUserById(params: any) {
    try {
        connectToDatabase();
        const { userId } = params;
        const user = await User.findOne({ clerkId: userId });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
