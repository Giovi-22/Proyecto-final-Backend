import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb)
        {
            cb(null,path.resolve("src/public/assets"));
        },
        filename: function(req, file, cb)
        {
            cb(null,file.originalname);
        }
    }
)

export const uploader = multer({storage})