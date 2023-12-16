import { Express } from 'express';
import multer from 'multer'

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // nombre del archivo
  }
});

const uploader = multer({ storage: storage });