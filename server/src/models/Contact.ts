import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IContact {
    name: string;
    email: string;
    phone: string;
    description: string;
    createdAt: Date | undefined;
}

const ContactSchema = new Schema<IContact>({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export interface ContactDocument extends IContact,mongoose.Document {};
const ContactModel: mongoose.Model<ContactDocument> = mongoose.model<ContactDocument>('contacts', ContactSchema);
export default ContactModel;
// export default mongoose.model('contacts', ContactSchema);