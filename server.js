const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const DBConnection = require('./config/db');
const categoryrouter = require('./routes/categoryRouter');
const ApiError = require('./utils/ApiError');
const globalError = require('./middlewares/errorMiddleware')
const subCategories = require('./routes/subCategoryRoute')
const brandRouter = require('./routes/brand')
dotenv.config();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
}

// DBConnection() will be called here to establish the database connection
DBConnection();

app.use('/api/v1/categories', categoryrouter);
app.use('/api/v1/subCategories', subCategories);
app.use('/api/v1/brands', brandRouter);

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
  });


//global.error handler
app.use(globalError)
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});