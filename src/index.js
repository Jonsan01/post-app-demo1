const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config()

let server;
const mongooseOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
}

mongoose.connect(process.env.DB_LOCAL, mongooseOption)
    .then(() => {
        console.log("MongoDB Connected...");
        server = app.listen(process.env.PORT, async () => {
            console.log(`app runing on ${process.env.PORT}`);
        });
    })

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);