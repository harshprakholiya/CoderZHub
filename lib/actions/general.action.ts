'use server'

import Tag from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Question from "@/database/question.model";

 export async function globalSearch(params: SearchParams) {
   const searchAbleTypes = ['question', 'user', 'answer', 'tag'];
   try {
    connectToDatabase();
    const { query, type } = params;

    const regexQuery = { $regex: query, $options: 'i' };

    let results = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: 'title',
        type: 'question'
      },
      {
        model: User,
        searchField: 'name',
        type: 'user'
      },
      {
        model: Answer,
        searchField: 'content',
        type: 'answer'
      },
      {
        model: Tag,
        searchField: 'name',
        type: 'tag'
      },
    ]

    const typeLower = type?.toLowerCase();

    if(!typeLower || !searchAbleTypes.includes(typeLower)) {
      // search all types

      for(const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({[searchField]: regexQuery})
          .limit(3);

        results.push(
          ...queryResults.map((item) => ({
            title: type === 'answer' ? `Answers containing ${query}` : item[searchField],
          type,
          id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id
          })
        ));
      }

    } else {
      // search in specific type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if(!modelInfo) {
        throw new Error('Invalid search type');
      }

      const queryResults = await modelInfo.model
        .find({[modelInfo.searchField]: regexQuery})
        .limit(10);

        results = queryResults.map((item) => ({
          title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchField],
          type,
          id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id

        }));
    }

    return JSON.stringify(results);

   } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch global result');
   }
 }