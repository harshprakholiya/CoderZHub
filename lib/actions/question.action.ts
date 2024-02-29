'use server';

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";
import { CreateQuestionParams, GetQuestionParams } from "./shared.types";
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
