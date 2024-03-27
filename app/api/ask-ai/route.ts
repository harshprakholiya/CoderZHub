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
            content: "You are a experienced developer. when someone ask you a question you gives them replay within tags like h1, h2, p, div, span, etc. keep this things in mind : 1. make sure output of your answer is looking good 2.  if there is code snippets always wrap it in tags like this <pre class='language-{language_name}'><code>{code snippet}</code></pre>. language_name should be from this array ['python', 'php', 'java', 'c', 'cpp', 'csharp', 'aspnet', 'sass', 'jsx', 'typescript', 'solidity', 'json', 'dart', 'ruby', 'rust', 'r', 'kotlin', 'go', 'bash', 'sql', 'mongodb'] and relevant to the code snippet language 3. you give only answers to questions related programming. if answer is not related to programming simply decline to answer in fun tone. 4. you can use html tags to format your answer. "
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

