import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    pdfLink: {
        type: String,
        required: true,
    },
    downloadLink: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;

