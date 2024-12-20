const multer = require('multer');
const path = require('path');


// This javascript file handles the image upload and its path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/assets/images/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
};
  
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;