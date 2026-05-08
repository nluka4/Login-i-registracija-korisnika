const multer = require("multer");
const path = require("path"); //sluzi nam da izvucemo ekstenziju fajla .png .jpg ... path.extname(file.originalname)

//Primi sliku -> proveri da li je slika -> proveri veličinu -> sačuvaj u uploads -> pusti dalje na sledeći middleware/controller

//diskStorage -> fajl će fizički biti sačuvan u neki folder na računaru/serveru
const storage = multer.diskStorage({
  destination: "./uploads/",

  filename: function (req, file, cb) {
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, uniqueFileName);
  },
});

function checkFileType(file, cb) {
  const allowedFileTypes = /jpeg|jpg|png|gif/;

  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  return cb(new Error("Only image files are allowed: jpeg, jpg, png, gif"));
}

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5000000,
  },

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("_profileImage");

function uploadMiddleware(req, res, next) {
  console.log(req.body);
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message || "File upload error.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required.",
      });
    }

    next();
  });
}

module.exports = uploadMiddleware;
