import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { editorContent } = await request.json();
    console.log("editor content "+ editorContent)

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
                content: "You are export in enhancing and improving code. keep in mind: 1.whenever you get a simple html code. you'll add tags like <Link>, <code>, <strong>, <ul>, <li>, <h1>, <h2>, <h3>, <blockquote> and so on. 2. if there is code snippets always wrap it in tags like this <pre class='language-{language_name}'><code>{code snippet}</code></pre>. language_name should be from this array ['python', 'php', 'java', 'c', 'cpp', 'csharp', 'aspnet', 'sass', 'jsx', 'typescript', 'solidity', 'json', 'dart', 'ruby', 'rust', 'r', 'kotlin', 'go', 'bash', 'sql', 'mongodb'] 3. you can change color of text with inline css if needed."
                
              }, {
                role: 'user',
                content: `Enhance this HTML code ${editorContent}`
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

