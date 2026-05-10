// Uvozimo multer biblioteku.
// Multer služi za obradu multipart/form-data requestova,
// odnosno requestova koji sadrže fajlove, npr. slike.
const multer = require("multer");

// Uvozimo path modul iz Node.js-a.
// On nam pomaže da radimo sa putanjama i ekstenzijama fajlova.
// Ovde ga koristimo da izvučemo ekstenziju fajla, npr. .jpg, .png...
const path = require("path");

// ---------------------------------------------------------
// STORAGE CONFIGURATION
// ---------------------------------------------------------
// diskStorage znači da će multer fizički sačuvati fajl
// u neki folder na računaru/serveru.
//
// Dakle, slika neće ostati samo u memoriji,
// nego će biti zapisana u folder "./uploads/".
const storage = multer.diskStorage({
  // destination govori multeru gde da sačuva uploadovani fajl.
  // U ovom slučaju slike idu u folder uploads.
  destination: "./uploads/",

  // filename određuje pod kojim imenom će fajl biti sačuvan.
  // Bez ovoga bi multer mogao da daje neka generisana/random imena.
  filename: function (req, file, cb) {
    // file.fieldname je ime polja iz forme.
    // Kod tebe je to "_profileImage".
    //
    // Date.now() dodaje trenutno vreme u milisekundama.
    // To se koristi da bi ime fajla bilo unikatno.
    //
    // path.extname(file.originalname) izvlači originalnu ekstenziju.
    // Primer: ako je originalni fajl "slika.jpg",
    // path.extname vraća ".jpg".
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    // cb je callback funkcija koju multer očekuje.
    //
    // Prvi argument je greška.
    // Ako nema greške, šaljemo null.
    //
    // Drugi argument je ime fajla koje želimo da multer koristi.
    cb(null, uniqueFileName);
  },
});

// ---------------------------------------------------------
// FILE TYPE VALIDATION
// ---------------------------------------------------------
// Ova funkcija proverava da li je uploadovani fajl stvarno slika.
function checkFileType(file, cb) {
  // Dozvoljene ekstenzije/tipovi fajlova.
  // Regex proverava da li se pojavljuje jpeg, jpg, png ili gif.
  const allowedFileTypes = /jpeg|jpg|png|gif/;

  // Proveravamo ekstenziju fajla.
  //
  // file.originalname je originalno ime fajla koji korisnik šalje.
  // Primer: "profilna.jpg"
  //
  // path.extname(file.originalname) vraća ".jpg"
  //
  // toLowerCase() se koristi da bi radilo i ako neko pošalje ".JPG".
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  // Proveravamo MIME tip fajla.
  //
  // MIME tip je npr:
  // image/jpeg
  // image/png
  // image/gif
  //
  // Ovo je dodatna provera pored ekstenzije.
  const mimetype = allowedFileTypes.test(file.mimetype);

  // Ako su i ekstenzija i MIME tip validni,
  // fajl se prihvata.
  if (extname && mimetype) {
    return cb(null, true);
  }

  // Ako fajl nije dozvoljenog tipa,
  // vraćamo grešku.
  return cb(new Error("Only image files are allowed: jpeg, jpg, png, gif"));
}

// ---------------------------------------------------------
// MULTER INSTANCE
// ---------------------------------------------------------
// Ovde pravimo konkretan multer upload middleware.
const upload = multer({
  // Kažemo multeru da koristi storage konfiguraciju odozgo.
  // Znači: fajl ide fizički u ./uploads/.
  storage: storage,

  // limits služi za ograničenja.
  limits: {
    // Maksimalna veličina fajla je 5,000,000 bajtova.
    // To je oko 5 MB.
    fileSize: 5000000,
  },

  // fileFilter se poziva pre nego što se fajl prihvati.
  // Ovde odlučujemo da li fajl sme da se uploaduje.
  fileFilter: function (req, file, cb) {
    // Pozivamo našu funkciju koja proverava tip fajla.
    checkFileType(file, cb);
  },

  // .single("_profileImage") znači:
  // očekujemo TAČNO JEDAN fajl iz polja koje se zove "_profileImage".
  //
  // Zato u Postmanu u form-data moraš da imaš key:
  // _profileImage
  //
  // i tip tog polja mora biti File.
}).single("_profileImage");

// ---------------------------------------------------------
// CUSTOM UPLOAD MIDDLEWARE
// ---------------------------------------------------------
// Ovo je middleware koji ćemo koristiti u ruti.
// On interno pokreće multer upload.
function uploadMiddleware(req, res, next) {
  // Pokrećemo multer upload.
  //
  // multer će ovde:
  // 1. pročitati form-data
  // 2. popuniti req.body običnim tekstualnim poljima
  // 3. popuniti req.file podacima o slici
  // 4. sačuvati sliku u uploads folder
  upload(req, res, function (err) {
    // Ako multer izbaci grešku,
    // npr. fajl je prevelik ili nije slika,
    // vraćamo status 400.
    if (err) {
      return res.status(400).json({
        message: err.message || "File upload error.",
      });
    }

    // Ako req.file ne postoji,
    // znači da korisnik nije poslao sliku.
    //
    // Pošto je kod tebe profilna slika obavezna,
    // vraćamo grešku.
    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required.",
      });
    }

    // Ovde u req.body ručno dodajemo ime fajla.
    //
    // req.file.filename je ime pod kojim je multer sačuvao sliku.
    // Primer:
    // _profileImage-1715252342342.jpg
    //
    // Ovo radiš da bi kasnije u registerController-u mogao da sačuvaš
    // ime slike u users.json ili bazu.
    req.body._profileImage = req.file.filename;

    // Ako je sve prošlo kako treba,
    // puštamo request dalje na sledeći middleware.
    //
    // U tvojoj ruti to je verovatno validateRegistration,
    // pa cryptPassword,
    // pa registerController.
    next();
  });
}

// Exportujemo middleware da možemo da ga koristimo u routes fajlu.
module.exports = uploadMiddleware;
