import * as z from 'zod'

export const QuestionsSchema = z.object({
    title: z.string().min(5, "String must contain at least 5 characters" ).max(150),
    explanation: z.string().min(20, "String must contain at least 20 characters"),
    tags: z.array(z.string().min(1, "Tag must have more than one character.").max(15, "Tags can only have 15 characters.")).min(1, "Add at least 1 Tag").max(3, "You can addxim a maum of 3 tags only."),
});


export const AnswersSchema = z.object({
    answer: z.string().min(10),
})

export const ProfileSchema = z.object({
    name: z.string().min(5).max(50),
    username: z.string().min(5).max(50),
    bio: z.string().min(10).max(150),
    portfolioWebsite: z.string().url(),
    location: z.string().min(5).max(50),
    
})

