import multer from "multer";

/* 
memoryStorage stores file in RAM as Buffer 
This avoids saving file to disk 
*/

const storage = multer.memoryStorage()

/* 
Multer middleware instance 
*/

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

export default upload;
