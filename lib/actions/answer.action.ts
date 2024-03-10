'use server';

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";

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