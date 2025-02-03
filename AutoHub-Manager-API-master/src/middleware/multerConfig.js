import multer from 'multer';
import fs from 'fs';


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    console.log('Destination:', uploadDir); 
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    
    console.log('Original Filename:', file.originalname); 
    cb(null, file.originalname); 
  },
});




const upload = multer({
  storage,
  limits: {
    fileSize: 50000000, // 10MB
    files: 10, // 10 files
    totalSize: 500000000, // 100MB
  },
  fileFilter: function (req, file, cb) {
    
    const acceptedMimeTypes = [
      'application/pdf',         
      'application/msword',      
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'image/jpeg',              
      'image/jpg',               
      'image/png',               
      'application/vnd.oasis.opendocument.text', 
      'application/vnd.ms-powerpoint',          
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      
    ];
  
    
    if (acceptedMimeTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(null, false); 
    }
  }
  ,
});

export default upload;
