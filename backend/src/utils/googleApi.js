import { google } from "googleapis";
import fs from "fs";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const refreshToken = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
);

oauth2Client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

async function uploadFile({filePath, name}) {
    try {

        const response = await drive.files.create({
            requestBody: {
                name: name,
                mimeType: "application/pdf"
            },
            media: {
                mimeType: "application/pdf",
                body: fs.createReadStream(filePath)
            }
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });

        const result = await drive.files.get({
            fileId: response.data.id,
            fields: "webViewLink, webContentLink"
        });

        return result.data ? result.data : null;

    } catch (error) {
        console.log(error.message);
    }
}

export { uploadFile };