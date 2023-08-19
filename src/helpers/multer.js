import multer from 'multer';
import path from 'path';

export const uploadFiles = (dirName)=>{

const storage = multer.diskStorage(
    {
        
        destination: function(req, file, cb)
        {
                switch(file.fieldname){
                    case 'profile': 
                        cb(null,path.resolve(`${dirName}/profile`));
                        break;
                    case 'product': 
                        cb(null,path.resolve(`${dirName}/products`));
                        break;
                    case 'document': 
                        cb(null,path.resolve(`${dirName}/documents`));
                        break;
                    default : cb(null,path.resolve(`${dirName}`));
                        break;
                }
        },
        filename: function(req, file, cb)
        {
            cb(null,file.originalname);
        }
    }
)
return multer({storage})
}
