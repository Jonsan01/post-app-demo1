const multer = require('multer')

const storage = multer.diskStorage({
    destination: multerDestination,
    filename: multerFilename
})

function multerFilename(req, file, next) {
    const extention = file.mimetype.split("/")[1];
    const filename = Date.now() + Math.round(Math.random() * 1E9) + "." + extention;
    if (!req.fileNames) req.fileNames = [];
    req.fileNames.push(filename)
    next(null, filename);
}

function multerDestination(req, file, next) {
    next(null, './src/upload');
}

module.exports = multer({ storage })