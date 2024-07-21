import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';

const app = express();
dotenv.config(); //to use .env we have to make some configuration

const connect = async () => { //whenever we connect to our backend server, we are going to call this function
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => { //this gonna listen our connection, and if there is some disconection problem, we can just log this problem
    console.log("mongoDB disconnected!");
})

//it will gonna connect mongoDB again and again
mongoose.connection.on("connected", () => { //this gonna listen our connection, and if there is some disconection problem, we can just log this problem
    console.log("mongoDB connected!");
})


//middlewares
app.use(cors());
app.use(express.json());//by default you can not send, any json object like this to our JSON server, so we need to use another middleware
app.use(cookieParser()); //using as middleware
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

//error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to Backend!")
});

export default app;
