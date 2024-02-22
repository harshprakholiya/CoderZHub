import * as z from 'zod'

export const QuestionsSchema = z.object({
    title: z.string().min(5, "String must contain at least 5 characters" ).max(60),
    explanation: z.string().min(100, "String must contain at least 100 characters"),
    tags: z.array(z.string().min(1, "Tag must have more than one character.").max(15, "Tags can only have 15 characters.")).min(1, "Add at least 1 Tag").max(3, "You can add a maximum of 3 tags only."),
});

