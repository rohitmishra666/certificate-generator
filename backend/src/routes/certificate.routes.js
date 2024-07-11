import express from 'express';
import { generateCertificate, getAllCertificates } from '../controllers/certificate.controller.js';

const router = express.Router();

router
    .route('/generate')
    .post(generateCertificate)
    .get(getAllCertificates)

export default router;