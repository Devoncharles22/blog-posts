const express = require('express');
const morgan = require('morgan');

const blogPostsRouter = require('./blogPostsRouter');
const app = express( );

app.use(morgan('common'));

//importing 'blogPostsRouter' router and route
app.use('/blog-posts', blogPostsRouter);
// /users usersRouter
// /settings settingsRouter

app.listen(process.env.PORT | | 8080, ( ) => {
	console.log(`Your app is listening on port ${porcess.env.PORT | | 8080}`);
});