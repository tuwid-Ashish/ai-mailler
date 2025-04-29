// 'use server';

// import { streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';
// import { createStreamableValue } from 'ai/rsc';

// export async function generate(input: string) {
//     const stream = createStreamableValue('');

//     console.log("input", input);
//     (async () => {
//         const { textStream } = await streamText({
//             model: openai('gpt-4o-mini'),
//             prompt: `
//             You are a helpful AI embedded in a email client app that is used to answer questions about the emails in the inbox.
//             ${input}
//             `,
//         });

//         for await (const delta of textStream) {
//             stream.update(delta);
//         }

//         stream.done();
//     })();

//     return { output: stream.value };
// }

'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createStreamableValue } from 'ai/rsc';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generate(input: string) {
    const stream = createStreamableValue('');

    console.log("input", input);

    (async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const result = await model.generateContentStream({
            contents: [{ role: "user", parts: [{ text: `
            You are a helpful AI embedded in an email client app that is used to answer questions about the emails in the inbox.
            ${input}
            ` }] }],
        });

        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                stream.update(text);
            }
        }

        stream.done();
    })();

    return { output: stream.value };
}
