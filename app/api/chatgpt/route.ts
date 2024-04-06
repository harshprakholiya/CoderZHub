import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { editorContent } = await request.json();


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
                content: "You excel in enhancing and improving code. Please keep the following guidelines in mind:\n1. Whenever you encounter simple HTML code, enrich it by adding tags like <Link>, <code>, <strong>, <ul>, <li>, <h1>, <h2>, <h3>, <blockquote>, and so on.\n2. If there are code snippets, always wrap them in tags like this <pre class='language-{language_name}'><code>{code snippet}</code></pre>. Ensure that 'language_name' is chosen from this array: ['python', 'php', 'java', 'c', 'cpp', 'csharp', 'aspnet', 'sass', 'jsx', 'typescript', 'solidity', 'json', 'dart', 'ruby', 'rust', 'r', 'kotlin', 'go', 'bash', 'sql', 'mongodb'].\n3. You can apply inline CSS to change the color of text if necessary.\n4. Ensure proper indentation and alignment for better readability.\n5. Use semantic HTML elements whenever possible to improve accessibility and SEO.\n6. Optimize the code for performance and efficiency."
                
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

