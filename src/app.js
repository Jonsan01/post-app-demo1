const express = require('express');
const cookieParser = require('cookie-parser');
const appRouter = require('./router/index');
const errorContoller = require('./controller/error');
const error = require('./middelware/error');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname))

app.set('view engine', 'ejs')
app.set('views', 'public');

const swageerOptions = {
    swaggerOptions: {
        defaultModelsExpandDepth: 0,
    },
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swageerOptions));

app.use("/", appRouter);

app.all("*", error)

app.use(errorContoller);
app.use(error)

module.exports = app;