import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err) cb(err, null);
            const fileName = `${hash.toString("hex")}-${file.originalname}`;

            cb(null, fileName)
        });
    }
  }),
  limits: {
      fileSize: 2 * 1024  * 1024
  },
  fileFilter: (req, file, cb) => {
      const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif",
      ];
      if(allowedMimes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error("Invalid file type."));
      }
  }
//   storage: multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'uploads'),
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const name = path.basename(file.originalname, ext);

//       cb(null, `${name}-${Date.now()}${ext}`)
//     },
//   })
};