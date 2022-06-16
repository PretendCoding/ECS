if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.use(express.static('./dist/public'));

app.listen(PORT);

console.log(`Server running on port ${PORT}`);