const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');


const app = express();
app.use(express.json());
app.use(authRouter);



const PORT = 3000;


app.listen(PORT, '0.0.0.0', function () {
    console.log(`Server is Running on PORT: ${PORT}`)
})


const connectionString = "mongodb+srv://Fitness-App-Cluster:fitness-app-cluster-db@fitness-app-cluster.qojdt.mongodb.net/?retryWrites=true&w=majority&appName=Fitness-App-Cluster";
mongoose.connect(connectionString).then(() => {
    console.log("MongoDB Connected Successfully!");
})










