const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const Review = require('../../models/review');
const Movie = require('../../models/movie');

const isValidObjectId = (value, { req }) => {
	const isValidObjectId = mongoose.isValidObjectId(value);
	if (!isValidObjectId) {
		return Promise.reject('Invalid movie ID');
	}
	return true;
};

const objectId = (value) => {
	if (value) {
		return mongoose.Types.ObjectId(value);
	}
};

const isAlreadyReviewed = async (value, { req }) => {
	const review = await Review.findOne({
		movie: req.body.movie,
		reviewer: req.user.id,
	});
	if (review) {
		return Promise.reject('This movie is already reviewed');
	}
	return true;
};

const isMovieExist = async (value, { req }) => {
	const movie = await Movie.findById(req.body.movie);
	if (!movie) {
		return Promise.reject("This movie doesn't exist");
	}
	return true;
};

exports.addReview = [
	body('review').trim().isLength({ min: 10, max: 1000 }),
	body('rating').trim().isInt({ min: 1, max: 10 }),
	body('movie')
		.trim()
		.custom(isValidObjectId)
		.bail()
		.custom(isMovieExist)
		.bail()
		.customSanitizer(objectId)
		.custom(isAlreadyReviewed),
];

exports.allReviews = [
	query('movie').custom(isValidObjectId).bail().customSanitizer(objectId),
	query('page').isInt({ min: 1 }).optional({ nullable: true }),
];

exports.userReviews = [
	param('userId').custom(isValidObjectId).bail().customSanitizer(objectId),
	query('page').isInt({ min: 1 }).optional({ nullable: true }),
];

exports.singleReview = [
	param('reviewId').custom(isValidObjectId).bail().customSanitizer(objectId),
];

exports.editReview = [
	param('reviewId').custom(isValidObjectId).bail().customSanitizer(objectId),
	body('review')
		.trim()
		.isLength({ min: 10, max: 1000 })
		.optional({ nullable: true }),
	body('rating').trim().isInt({ min: 1, max: 10 }).optional({ nullable: true }),
	body('movie')
		.trim()
		.custom(isValidObjectId)
		.bail()
		.customSanitizer(objectId)
		.optional({ nullable: true }),
];

exports.deleteReview = [
	param('reviewId').custom(isValidObjectId).bail().customSanitizer(objectId),
];
