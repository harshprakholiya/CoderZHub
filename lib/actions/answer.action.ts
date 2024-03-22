'use server';

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import { error } from "console";
import { Tag } from "lucide-react";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams){
    try {
        connectToDatabase();
        const { content, author, question, path } = params;
        const newAnswer = await Answer.create({
            content,
            author,
            question,
        });

        // ? Add answers to question answer array.

        await Question.findByIdAndUpdate(question, {
            $push: {answers: newAnswer._id}
        })

        // TODO: Add interaction to increase reputation of author.

        revalidatePath(path);
        

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function getAnswer(params: GetAnswersParams){
 try {
    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId}).populate("author", "_id clerkId name picture").sort({createdAt: -1});

    return { answers };

 } catch (error) { 
    console.log(error);
 }
}

export async function upvoteAnswer(params: AnswerVoteParams){
    try {
        connectToDatabase();
        const { answerId, userId, hasDownvoted, hasUpvoted, path } = params;

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

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new:true});

        if(!answer) throw new Error("Answer not found");

        // TODO: update users reputation

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function downvoteAnswer(params: AnswerVoteParams){ 
    try {
        connectToDatabase();
        const { answerId, userId, hasDownvoted, hasUpvoted, path } = params;

        let updateQuery = {};  
        
        if(hasDownvoted){
            updateQuery = { $pull: { downvotes: userId }};   
        } else if(hasUpvoted){
            updateQuery = {
                $pull: { upvotes: userId },
                $push: { downvotes: userId }
            }
        }  
        else {
            updateQuery = {$addToSet: { downvotes: userId }}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new:true});

        if(!answer) throw new Error("Answer not found");

        // TODO: update users reputation

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function deleteAnswer(params: DeleteAnswerParams){
    try {
        connectToDatabase();
        const { answerId, path } = params;

        const answer = await Answer.findById({_id: answerId})

        if(!answer){
            throw new Error('Answer not found');
        }

        await answer.deleteOne({_id: answerId});

        await Question.updateMany({_id: answer.question}, {$pull: {answers: answerId}})

        await Interaction.deleteMany({answer: answerId})

        revalidatePath(path)

    } catch (error) {
        console.log(error);
        throw error; 
    }
}