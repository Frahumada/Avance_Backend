import multer from 'multer';
import { __dirname } from '../../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/src/public/images')
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname)
    }
  })
  
  export const uploader = multer({ storage: storage });