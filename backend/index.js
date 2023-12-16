import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';

dotenv.config();

mongoose.connect('mongodb+srv://root:root@mern.9ypqgws.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log(`connected to Database`);
}).catch((err)=>{
    console.log(err)
});

const app= express();
app.use(express.json())

app.listen(3000,()=>{
    console.log(`server listening on port 3000`)
}) 

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use(cors());

app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return req.status(statusCode).json(
        {
            success : false,
            message,
            statusCode,
        });
});

