const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');


const app = express();
app.use(express.json());
app.use(authRouter);



app.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`Server is Running on PORT: ${PORT}`)
})



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected Successfully!");
})










