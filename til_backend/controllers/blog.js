const router = require('express').Router();
const sharp = require('sharp');
const path = require('path');

const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { validateToken } = require('../utils/middleware');
const upload = require('../utils/multer');

const { getReadTime } = require('../utils/helpers/blog');

router.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('author', 'id name');
	return res.json(blogs.map(blog => blog.toJSON()));
});

router.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('author', 'id name');
	return res.json(blog.toJSON());
});

router.get('/:id/comments', async (req, res) => {
	const comments = await Comment.find({ blogId: req.params.id }).populate('author');
	return res.json(comments.map(comment => comment.toJSON()));
});

// validate everything but file. if error, don't bother with file and return an error
// if everything but file is good, validate file using multer
// if error with file, don't save new object to database and return error

router.post('/', validateToken, upload.single('image'), async (req, res, next) => {
	try {
		const newBlog = new Blog({
			...req.body,
			readTime: getReadTime(req.body.content),
			pictureUrl: req.file ? `/uploads/${req.file.filename}` : null,
			author: req.user.id
		});

		const author = await User.findById(req.user.id);

		author.blogs = [...author.blogs, newBlog._id];
		author.save();
	
		const savedBlog = await newBlog.save();

		let POJO = savedBlog.toObject();
	
		POJO = {
			...POJO,
			author: {
				name: author.name,
				id: author._id
			},
			id: POJO._id
		};
	
		delete POJO._id;
		delete POJO.__v;

		// const fileNameParts = req.file.filename.split('.');
		// const newFileName = fileNameParts[0] + '-small.' + fileNameParts[1];

		// sharp(path.join(__dirname, `../public/uploads/${ req.file.filename }`))
		// 	.resize(480)
		// 	.toFile(path.join(__dirname, `../public/uploads/${ newFileName }`))
		// 	.catch(err => console.log(err.message));

		return res.json(POJO);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.post('/:id/comments', async (req, res, next) => {
	try {
		const blog = await (await Blog.findById(req.params.id));

		if (!blog) {
			return next('Invalid Blog Id');
		}

		const comment = new Comment({
			...req.body,
			blogId: blog.id,
		});

		blog.comments = [...blog.comments, comment.id];

		await blog.save();
		await comment.save();

		return res.json(comment.toJSON());
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			error: 'Error Saving Comment'
		});
	}

});

router.put('/:id', validateToken, upload.single('image'), async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);

	try {
		const content = {
			...req.body,
			readTime: getReadTime(req.body.content),
			pictureUrl: req.file ? `/uploads/${req.file.filename}` : blog.pictureUrl,
			author: req.user.id
		};

		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, content, { new: true });
		let POJO = updatedBlog.toObject();
	
		POJO = {
			...POJO,
			id: POJO._id
		};
	
		delete POJO._id;
		delete POJO.__v;
	
		return res.json(POJO);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', validateToken, async (req, res) => {
	let deletedBlog;
	let blogAuthor;

	try {
		deletedBlog = await Blog.findByIdAndDelete(req.params.id);
		blogAuthor = await User.findById(req.user.id);

		if (!deletedBlog.author.equals(blogAuthor._id)) {
			return res.status(401).end();
		}

		blogAuthor.blogs = blogAuthor.blogs.filter(blogId => !blogId.equals(deletedBlog._id));
		await blogAuthor.save();
	} catch (err) {
		return res.status(500).json({
			error: 'Error Deleting Blog'
		});
	}
	return res.json(deletedBlog.toJSON());
});

module.exports = router;