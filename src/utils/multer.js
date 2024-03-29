import multer from 'multer';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            cb(new Error('file format not supported'), false);
        }
        req.imageName = file.originalname;
        cb(null, true);
    }
})

export default upload;