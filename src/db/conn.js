const mongoose = require("mongoose") 


mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_DATABASE).then(() => {
    console.log("Database connected")
}).catch((error) => {
    console.log("No database connection")
    console.log(process.env.MONGODB_URL)
})