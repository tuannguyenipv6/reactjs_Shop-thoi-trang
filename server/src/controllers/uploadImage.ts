import multer from 'multer';

const multerConfig = multer.diskStorage({
    // Nơi lưu img
    destination: (_req, _file, callback) => {
        callback(null, 'public/images');
    },
    // Đặt tên img
    filename: (_req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        // const nameFile = file.originalname.split('.');
        callback(null, `${Date.now()}.${ext}`);
    }
})
const isImage = (_req: any, file: any, callback: any) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true);
    }else {
        callback(new Error('Only Image is allowed...'));
    }
}
var upload = multer({ 
    storage: multerConfig,
    fileFilter: isImage,
})
export const uploadImage = upload.single('myFile');

export const upLoad = async (req: any, res: any) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Add img successfuly!',
            data: req.file.filename
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal server error' 
        })
    }
}