import Certificate from "../models/certificate.models.js";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { uploadFile } from '../utils/googleApi.js'
import path from 'path'

async function generateCertificate(req, res) {

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([800, 600])
    const { name, course, date, email } = req.body

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    page.drawRectangle({
        x: 20,
        y: 20,
        width: page.getWidth() - 40,
        height: page.getHeight() - 40,
        borderWidth: 5,
        borderColor: rgb(245 / 255, 167 / 255, 12 / 255),
    });

    page.drawText('CERTIFICATE OF COMPLETION', {
        x: 170,
        y: 500,
        size: 30,
        font: timesRomanBoldFont,
        color: rgb(0.12, 0.12, 0.36),
    });

    page.drawText('This certificate is proudly presented to', {
        x: 270,
        y: 450,
        size: 16,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(name, {
        x: 300,
        y: 400,
        size: 30,
        font: timesRomanBoldFont,
        color: rgb(0.95, 0.69, 0.15),
    });

    page.drawText(`For successfully completing the ${course} course on ${date}.`, {
        x: 220,
        y: 350,
        size: 16,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText('Tutedude wishes you the best for your future endeavours and success.', {
        x: 200,
        y: 300,
        size: 16,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawLine({
        start: { x: 130, y: 170 },
        end: { x: 260, y: 170 },
        thickness: 3,
        color: rgb(245 / 255, 167 / 255, 12 / 255),
    });

    page.drawText('Shivam Goyal', {
        x: 150,
        y: 150,
        size: 14,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawLine({
        start: { x: 480, y: 170 },
        end: { x: 630, y: 170 },
        thickness: 3,
        color: rgb(245 / 255, 167 / 255, 12 / 255),
    });

    page.drawText('Abhishek Gangwar', {
        x: 500,
        y: 150,
        size: 14,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText('Co-Founder', {
        x: 160,
        y: 130,
        size: 10,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText('Co-Founder', {
        x: 510,
        y: 130,
        size: 10,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Certificate id : ${uuidv4().slice(0, 23)}`, {
        x: 600,
        y: 50,
        size: 10,
        font: timesRomanFont,
        color: rgb(0.2, 0.2, 0.2),
    });

    const pdfBytes = await pdfDoc.save()

    const directory = 'public'
    const filename = `${name}-certificate-${uuidv4()}.pdf`
    const filePath = path.join(directory, filename)

    fs.writeFileSync(filePath, pdfBytes)
    const {webViewLink, webContentLink} = await uploadFile({ filePath, name: filename });

    if(!webViewLink || !webContentLink) {
        return res.status(400).json({
            message: 'Certificate could not be generated!!',
            statusCode: 400
        });
    }

    const certificate = await Certificate.create({
        name,
        course,
        date,
        email,
        pdfLink: webViewLink,
        downloadLink: webContentLink
    })

    if(!certificate) {
        return res.status(400).json({
            message: 'Certificate could not be generated!!',
            statusCode: 400
        });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
    });
    
    return res.json({
        certificate,
        message: 'Certificate generated successfully!!'
    });

}

async function getAllCertificates(req, res) {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });
    return res.json(certificates);
}
export {
    generateCertificate,
    getAllCertificates
}