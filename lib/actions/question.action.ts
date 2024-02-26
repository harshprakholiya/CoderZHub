'use server';

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";

 
export async function createQuestion(params: any ) {
    try {

        connectToDatabase();
        const { title, content, tags, author, path } = params;
        connectToDatabase();

         //* Create Questions
         const question = await Question.create({
            title,
            content,
            author
         })    

         const tagDocument = [];


         //* Create Tags or get the existing tags
         for(const  tag of tags ) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i")} },
                {$setOnInsert: { name: tag }, $push: {question: question._id }  },
                { upsert: true, new:true }
            )
            tagDocument.push(existingTag._id);
         }

            //* Update the question with the tags

            await Question.findByIdAndUpdate(question._id, 
                {$push: {tags: { $each: tagDocument }} } );

                // create an interaction record for the user's ask_question action

                // Increment author's reputation by 5



    } catch (error){
        
    }
}