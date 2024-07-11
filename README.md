
```markdown
# Certificate Generator

This project is a Certificate Generator application that allows admins to manage certificate requests, generate certificate PDFs, save them to Google Drive, and store the certificate links in a MongoDB database. The application is built using React for the frontend, Node.js for the backend, and integrates with Google Drive for storage.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

### User Interface
- **Admin Interface**: Admins can view and manage certificate requests.
  
### Details Submission
- **Form Submission**: Admins can enter the Name, Course, and Date of Certificate approval.

### Certificate Generation
- **Automatic PDF Generation**: After entering details, a certificate PDF is automatically generated with the provided information.
- **Google Drive Integration**: The generated certificate PDF is saved to Google Drive and its link is saved in the database.

### Certificate Link Storage
- **Database Storage**: The link to the generated certificate PDF is stored in a MongoDB database along with the student's email.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router DOM, Axios
- **Backend**: Node.js, Express, pdf-lib
- **Database**: MongoDB
- **Storage**: Google Drive

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Google API credentials for accessing Google Drive

### Clone the repository

```bash
git clone https://github.com/your-username/certificate-generator.git
cd certificate-generator
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory and add your environment variables:

```env
PORT=8001
MONGO_URI=your-mongodb-uri
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
REDIRECT_URI=your-google-redirect-uri
REFRESH_TOKEN=your-google-refresh-token
```

4. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Use the admin interface to submit certificate details and generate certificates.
3. Generated certificates will be saved to Google Drive, and the links will be stored in the MongoDB database.

## Project Structure

```plaintext
certificate-generator/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .env
    ├── package.json
```

## API Endpoints

### Backend

- **POST /api/certificate/generate**
  - Description: Generates a certificate and saves it to Google Drive.
  - Request Body: `{ "name": "string", "course": "string", "date": "string", "email": "string" }`
  - Response: `{ "message": "Certificate Generated Successfully", "link": "Google Drive link" }`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This `README.md` file provides an overview of the project, details about the features, the tech stack used, and instructions for installation and usage. Adjust any specific details (like GitHub URLs or additional setup instructions) as necessary.
