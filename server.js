const express = require('express');
const morgan = require('morgan');

const blogPostsRouter = require('./blogPostsRouter');
const app = express( );

app.use(morgan('common'));

//importing 'blogPostsRouter' router and route
app.use('/blog-posts', blogPostsRouter);
// /users usersRouter
// /settings settingsRouter

let server; 

function runServer( ) {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app.listen(port, () => {
			console.log(`Your app is listening on port ${port}`); 
			resolve(server);
		}).on('error', err => {
			reject(err)
		});
	});
};

function closeServer( ) {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if (err) {
				reject(err);
				return;
			}
			resolve( );
		});
	});
};

// if server.js is called directly in command line with `node server.js`
//this block runs, but will also export the runServer 
if(require.main === module) {
	runServer( ).catch(err => console.error(err))
};
module.exports = {app, runServer, closeServer};
