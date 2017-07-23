const express = require('express');
const router = express.Router( );

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json( );

const {BlogPosts} = require('./models');

//function for generating blog posts content
function content( ) {
	'Ask not what your coding mentor can do for you, but rather what you can do for your node project!'
}

//adding blog posts to `BlogPosts` so there's something to retreive.
BlogPosts.create('Post1', content( ), 'Leonardo Capri');
BlogPosts.create('Post2', content( ), 'Raphael Dumas');

//adding endpoint for GET requests - should call `BlogPosts.get( )` & return JSON objects of
//stored blog posts.
router.get('/', (req, res) => {
	res.json(BlogPosts.get( ));
});

//adding endpoint for POST requiests - should cause a new post to be added using 
//`BlogPosts.create( )`.  It should return a JSON obj. representing new post. 
//the endpoint should send a 400 error if the post does not contaitn required 'title', 'content', 
//and 'author'
router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i =0; i <requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			cont message = `Missing \ `${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		};
		const item = BlogPosts.create(
			req.body.title, req.body.content, req.body.author);
		res.status(201).json(item);
	});
});

//adding enpoint for PUT req's to update blog posts. it should call `BlogPosts.update( )`
//return the updated post, ensure post matched the id of the path variable, and 
//the required fields:  `id`, `title`, `content`, `author`, `publishDate` are in request body
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = [
	'id', 'title', 'content', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i ++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = 'Missing \ `${field}` in request body'
			console.error(mesage);
			return res.status(400).send(message);
		};
	};
		if (req.params.id !== req.body.id) {
			const message = (
				`Request path id (${req.params.id}) and request body id  `
				`(${req.body.id}) must match`);
			console.error(message);
			return res.status(400).send(message);
		};
		console.log(`Updating blog post with id \ `${req.params.id}\ ` `);
		const updatedItem = BlogPosts.update({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate
		});
		res.status(204).end( );
});

//adding endpoint for DELETE requests, which should have an id as a URL path variable 
//and call `BlogPosts.delete( )`
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post with id \ `${req.params.ID}\ ` `);
	res.status(204).end( );
});

module.exports = router;



