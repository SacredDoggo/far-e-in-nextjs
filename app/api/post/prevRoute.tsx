import { NextApiRequest, NextApiResponse } from 'next';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '@/mongodb/models/post.js';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        try {
            const posts = await Post.find({});
    
            res.status(200).json({ success: true, data: posts });
        } catch (error) {
            res.status(500).json({ success: false, data: error });
        }
    }
    if(req.method === 'POST'){
        try {
            const{ name, prompt, photo } = req.body;
            const photoUrl = await cloudinary.uploader.upload(photo);
            console.log(photoUrl.url);
    
            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.url,
            });
    
            const temp = await Post.find({});
            console.log('nope cant get shit here: '+ temp);
    
            res.status(201).json({ success: true, data: newPost });
        } catch (error) {
            res.status(500).json({ success: false, data: error });
        }
    }
}





// // GET ALL IMAGES
// router.route('/').get(async(req, res) => {
//     try {
//         const posts = await Post.find({});

//         res.status(200).json({ success: true, data: posts });
//     } catch (error) {
//         res.status(500).json({ success: false, data: error });
//     }
// });

// // POST THE IMAGE
// router.route('/').post(async(req, res) => {
//     try {
//         const{ name, prompt, photo } = req.body;
//         const photoUrl = await cloudinary.uploader.upload(photo);
//         console.log(photoUrl.url);

//         const newPost = await Post.create({
//             name,
//             prompt,
//             photo: photoUrl.url,
//         });

//         const temp = await Post.find({});
//         console.log('nope cant get shit here: '+ temp);

//         res.status(201).json({ success: true, data: newPost });
//     } catch (error) {
//         res.status(500).json({ success: false, data: error });
//     }
// });


