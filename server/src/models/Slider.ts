import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface ISlider {
    title: string;
    name: string;
    description: string;
    img: string;
    idKey?: number;
    isProduct?: boolean;
}

const SliderSchema = new Schema<ISlider>({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    idKey: Number,
    isProduct: Boolean,
});

export interface SliderDocument extends ISlider, mongoose.Document {};
const SliderModal: mongoose.Model<SliderDocument> 
    = mongoose.model<SliderDocument>('sliders', SliderSchema);
export default SliderModal;