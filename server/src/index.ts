import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import commentRouter from './routes/Comment';
import contactlRouter from './routes/contact';
import generalDatabaseCommon from './routes/DatabaseCommon';
import productRouter from './routes/Product';
import shipmentDetailsRouter from './routes/ShipmentDetails';
import uploadImage from './routes/uploadImage';
import oderRouter from './routes/Oder';
import sliderRouter from './routes/Slider';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// connect mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ub4vp.mongodb.net/NQT-Shop?retryWrites=true&w=majority`)
        console.log('Kết nối thành công mongodb');
    } catch (error) {
        console.log(error.message);
        process.exit(1); 
    }
}

connectDB();

declare global {
    namespace Express {
        interface Request {
            userAdmin: boolean;
            userId: string;
            counter: number;
        }
    }
}

app.use(express.static('public'));  
app.use('/images', express.static('images')); 

app.use(express.json());   
app.use(cors())

app.get('/', (_req, res) => res.send('Shop NQT'));

app.use('/api/auth', authRouter)

app.use('/api/contact', contactlRouter)

app.use('/api/database-common', generalDatabaseCommon);

app.use('/api/product', productRouter)

app.use('/api/comment', commentRouter)

app.use('/api/shipment-details', shipmentDetailsRouter)

app.use('/api/upload-image', uploadImage);

app.use('/api/oder', oderRouter);

app.use('/api/slider', sliderRouter);

app.listen(PORT, () => {
    console.log(`Server dang chay PORT: ${PORT}`);
});