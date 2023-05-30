import { NextRequest, NextResponse } from 'next/server';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '@/mongodb/models/post.js';
import connectDB from '@/mongodb/connect.js';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(){
    try {
        await connectDB();
        const posts = await Post.find({});        
        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, data: error });
    }
}

export async function POST(request: Request)
    {
    try {
        await connectDB();
        const req = await request.json();
        const name = req.name;
        const prompt = req.prompt;
        const photo = req.photo;
        // const{ name, prompt, photo } = req.body;
        
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        

        return NextResponse.json({ success: true, data: newPost });
    } catch (error) {
        return NextResponse.json({ success: false, data: error });
    }
}