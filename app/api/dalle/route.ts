import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/mongodb/connect.js';


dotenv.config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);


export async function GET(){
    return new Response("Hello from Far E 2");
}

export async function POST(request: Request)
    {
    try {
        await connectDB();
        const req = await request.json();
        const prompt = req.prompt;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;
        return NextResponse.json({ photo: image });

    } catch (error) {
        return new Response(error?.response.data.error.message);
    }
}










// router.route('/').get((req, res) => {
//     res.send("Hello from Far E 2")
// });

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         });

//         const image = aiResponse.data.data[0].b64_json;
//         res.status(200).json({ photo: image });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response.data.error.message);
//     }
// })

// export default router;