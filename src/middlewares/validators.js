const { body, validationResult } = require('express-validator');

exports.validateBlogInsertion = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 120 }).withMessage('Title should not exceed 120 characters'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 100000 }).withMessage('Description should be between 10 and 100,000 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
