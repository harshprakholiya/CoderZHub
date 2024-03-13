'use server';

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";


export async function getQuestions(params: GetQuestionParams){
    try {
        connectToDatabase();
        const question = await Question.find({})
        .populate({ path: 'tags', model: Tag})
        .populate({ path: 'author', model: User })
        .sort({createdAt: -1})
        return { question }
    } catch (error) {
        console.log(`getQuestions : ${error}`);
        throw error;
    }
}

export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();
        const { title, content, tags, author, path } = params;

            // Create Questions
        const question = await Question.create({
            title,
            content,
            author
        });

        const tagDocument = [];

        // Create Tags or get the existing tags
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $push: { question: question._id } },
                { upsert: true, new: true }
            );
            tagDocument.push(existingTag._id);
        }

        // Update the question with the tags
        await Question.findByIdAndUpdate(question._id,
            { $push: { tags: { $each: tagDocument } } });

            revalidatePath(path)

    } catch (error) {
        console.log(`createQuestion : ${error}`)
    }
}


export async function getQuestionById(params: GetQuestionByIdParams) {

    try {
        connectToDatabase();
         
        const { questionId } = params;
        const question = await Question.findById(questionId)
        .populate({ path: 'tags', model: Tag, select: '_id name '})
        .populate({ path: 'author', model: User, select: '_id name picture clerkId'});
        return question;

    } catch (error) {
        console.log(`getQuestionById : ${error}`);
        throw error;
    }

}

export async function upvoteQuestion(params: QuestionVoteParams){
    try {
        connectToDatabase();
        const { questionId, userId, hasDownvoted, hasUpvoted, path } = params;

        let updateQuery = {};
        
        if(hasUpvoted){
            updateQuery = { $pull: { upvotes: userId }};   
        } else if(hasDownvoted){
            updateQuery = {
                $pull: { downvotes: userId },
                $push: { upvotes: userId }
            }
        }
        else {
            updateQuery = {$addToSet: { upvotes: userId }}
        }

        const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new:true});

        if(!question) throw new Error("Question not found");

        // TODO: update users reputation

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function downvoteQuestion(params: QuestionVoteParams){
    try {
        connectToDatabase();
        const { questionId, userId, hasDownvoted, hasUpvoted, path } = params;

        let updateQuery = {};  
        
        if(hasDownvoted){
            updateQuery = { $pull: { downvote: userId }};   
        } else if(hasUpvoted){
            updateQuery = {
                $pull: { upvotes: userId },
                $push: { downvotes: userId }
            }
        }  
        else {
            updateQuery = {$addToSet: { downvotes: userId }}
        }

        const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new:true});

        if(!question) throw new Error("Question not found");

        // TODO: update users reputation

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}