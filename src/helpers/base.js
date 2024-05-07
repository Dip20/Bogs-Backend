const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Define allowed file types
const fileFilter = (req, res, file, cb) => {
    const allowedTypes = ['csv', 'txt', 'xls', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(extname.substring(1))) {
        cb(null, true);
    } else {
        cb(null, false);
        req.fileValidationError = 'Only csv, txt, xls, doc, docx, pdf, jpg, jpeg, png files are allowed.';
    }
};

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
    fileFilter: fileFilter
});
