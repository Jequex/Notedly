const mongoose = require('mongoose');

const DB_STR = "mongodb+srv://Jequex:jequexPassword@main.p6pf3.mongodb.net/Notedly?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_STR, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
        
        console.log("db connected successfully");
    } catch (error) {
        console.log('database error');
    }
};

module.exports = connectDB;
