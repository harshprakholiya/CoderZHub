/* eslint-disable no-unused-vars */
"use server"
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserInfoParams, UpdateUserParams, getUserSatesParams, toggleSaveQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: GetUserByIdParams) {
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

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user) {
      throw new Error('User not found');
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers( params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {}

    let sortOptions = {};

    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1}
        break;
      case 'old_users':
        sortOptions = { joinedAt: 1}
       
        break;
      case 'top_contributors':
        sortOptions = { reputation: -1}

        break;
    
      default:
        break;
    }


    if (searchQuery) {
      query.$or = [
        {name: { $regex: new RegExp(searchQuery, 'i') }},
        {username: { $regex: new RegExp(searchQuery, 'i') }},
      ]
    }

    const users = await User.find(query)
      .sort(sortOptions)
    
    return { users };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: toggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if(!user) throw new Error('User not found');

    const isSaved = user.saved.includes(questionId);

    if(isSaved) {
      await User.findByIdAndUpdate(userId, {
        $pull: {  saved: questionId }
      }, { new: true });
    } else   {
      await User.findByIdAndUpdate(userId, {
        $addToSet: {  saved: questionId }
      }, { new: true });
    }

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams){


  try {
    connectToDatabase();
    
    const { clerkId, searchQuery, filter } = params;

    
    const query: FilterQuery<typeof Question> = searchQuery
    ? { title: { $regex: new RegExp(searchQuery, 'i')} } 
    :{};

    let sortOptions = {};

    switch (filter) {
      case 'most_recent':
        sortOptions = { createdAt: -1}
        break;
      case 'oldest':
        sortOptions = { createdAt: 1}  
        break;
      case 'most_voted':
        sortOptions = { upvotes: -1}
        break;
      case 'most_viewed':
        sortOptions = { views: -1}
        break;
      case 'most_answered':
        sortOptions = { answers: -1}
        break;
    
      default:
        break;
    }
    
    const user = await User.findOne({ clerkId })
      .populate({
        path: 'saved',
        match: query,
        options: {
          sort: sortOptions,
        },
        populate: [
          {path: 'tags', model: 'Tag', select: "_id name"},
          {path: 'author', model: 'User', select: "_id name username picture clerkId"  }
        ]
      })


      if(!user) throw new Error('User not found');

      const savedQuestions = user.saved;
      return { question: savedQuestions}

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserInfoParams){
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({clerkId: userId})

    if(!user) throw Error('user not found');

    const totalQuestions = await Question.countDocuments({author: user._id})
    const totalAnswers = await Answer.countDocuments({author: user._id})

    return {
      user,
      totalAnswers,
      totalQuestions
    }

     

  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions(params: getUserSatesParams){
  try {
    connectToDatabase();
    const { userId, page=1, pageSize=10 } = params;

    const totalQuestions = await Question.countDocuments({author: userId});

    const userQuestions = await Question.find({author: userId})
      .sort({views: -1, upvotes: -1})
      .populate('tags', '_id name')
      .populate('author', '_id clerkId, name picture')

      
      return { 
        totalQuestions, questions: userQuestions
      }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserAnswers(params: getUserSatesParams){
  try {
    connectToDatabase();
    const { userId, page=1, pageSize=10 } = params;

    const totalAnswers = await Answer.countDocuments({author: userId});

    const userAnswers = await Answer.find({author: userId})
      .sort({ upvotes: -1})
      .populate('question', '_id name title')
      .populate('author', '_id clerkId, name picture upvotes createdAt')

      
      return { 
        totalAnswers, answers: userAnswers
      }
  } catch (error) {
    console.log(error)
    throw error
  }
}
