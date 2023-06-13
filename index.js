const express = require('express')
const { myServer } = require('./configs/db')
const { postRoutes } = require('./routes/JobPost.routes')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())


app.use('/jobPost', postRoutes)



app.listen(PORT, async()=> {

    try {
        await myServer;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }

console.log(`server started at` +' '+PORT);
})