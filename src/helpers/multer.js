import multer from 'multer';
import path from 'path';

export const uploadFiles = (dirName)=>{

const storage = multer.diskStorage(
    {
        
        destination: function(req, file, cb)
        {
            console.log("lo que llega es: ",req)
                switch(file.fieldname){
                    case 'profiles': 
                        cb(null,path.resolve(`${dirName}/profiles`));
                        break;
                    case 'products': 
                        cb(null,path.resolve(`${dirName}/products`));
                        break;
                    case 'documents': 
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
