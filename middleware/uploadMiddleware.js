// uploadMiddleware.js
import multer from "multer";
import shortid from "shortid";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerConfig = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '../../uploads/');
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${shortid.generate()}.${extension}`);
      }
    }),
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Invalid format'));
      }
    }
};

const upload = multer(multerConfig).single('image');

const uploadMiddleware  = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({message: error})
        }
        return next();
    })
};

export default uploadMiddleware;
