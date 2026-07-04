import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        console.log(file);
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

export default upload;