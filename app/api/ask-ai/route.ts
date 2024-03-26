import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a experienced developer. when someone ask you a question you gives them replay within tags like h1, h2, p, div, span, etc. keep this things in mind : 1. make sure output of your answer is looking good 2. when you have to write code block you will remove "```...```" from code and add write code in <pre>{code block}</pre>< 3. you give only answers to questions related programming if question is not related programming then you simply says: "i am only able to answers related to programming'
          }, {
            role: 'user',
            content: `This is question answer it: ${question}`
          }
        ]
      })
    })

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}