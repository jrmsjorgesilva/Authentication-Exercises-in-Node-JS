const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;


//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
//ENVOROMENTAL VARIABLE CONFIGURATION
const dotenv = require('dotenv');
dotenv.config();

//CONNECTION WITH MONGO DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('Connected sucessfully with DB')
);

//MIDDLEWARE
app.use(express.json());

//ROUTE MIDDLEWARES
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);

//LISTENING
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});