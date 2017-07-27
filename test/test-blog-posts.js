const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../blogPostsRouter');
const should = chai.should( );
chai.use(chaiHttp);

describe('Blog Posts', function( ) {
	//before test run, active the server
	before(function( ) {
		return runServer( );
	});
	//close server after tests run 
	//in case we have other test modules that need to call `runServer`
	after(function( ) {
		return closeServer( );
	});
	//GET test
	it('should list blog posts on GET', function( ){
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.above(0);
			res.body.forEach(function(blog) {
				blog.should.be.a('object');
				blog.should.have.all.keys(
					'id', 'title', 'content', 'author', 'publishDate');
			});
		});
	});
	//POST test
	it('should add a blog post on POST', function( ) {
		const newPost = {
			title: 'The Taming of the Node Project',
			content: 'What the heck is going to be the subject of your Node Project?',
			author: 'Devon Charles',
	};
	const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));

	return chai.request(app)
		.post('/blog-posts')
		.send(newPost)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.all.keys(expectedKeys);
			res.body.title.should.equal(newPost.title);
			res.body.content.should.equal(newPost.title);
			res.body.author.should.equal(newPost.author);
		});
	});
//POST error response
	it('should have error if POST expected values', function( ) {
		const badRequestsData = { };
		return chai.request(app)
			.post('/blog-posts')
			.send(badRequestsData)
			.catch(function(res) {
				res.should.have.status(400);
			});
	});
	//PUT test
	it('should update blog posts on PUT', function( ) {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				const updatedPost = Object.assign(res.body[0], {
					title: 'This is a PUT Test',
					content: "Oh yea!"
				});
				return chai.request(app)
					.put(`/blog-posts/${res.body[0].id}`)
					.send(UpdatedPost)
					.then(function(res) {
						res.should.have.status(204);
					});
			});
	});
	//DELETE test 
  it('should delete posts on DELETE', function( ) {
    return chai.request(app)
      // first have to get
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`)
          .then(function(res) {
            res.should.have.status(204);
          });
      });
  });
});
	
