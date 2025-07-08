# AI Resume Evaluation API

This is a Node.js-based backend API that uses **Google Gemini AI** to evaluate resumes against a given job description. It supports PDF and DOCX resume files and provides intelligent feedback, skill gap analysis, and a selection verdict.

## ✨ Features

- Upload and parse resumes (PDF or DOCX)
- Compare resume against a job description using Google Gemini AI
- Get:
  - Matching skills
  - Gaps in skills/experience
  - Final verdict: Selected or Rejected
  - Brief justification
- Simple JSON API

## 📦 Tech Stack

- Node.js
- Express.js
- Multer (for file uploads)
- `pdf-parse` and `mammoth` (for extracting text from PDF and DOCX)
- Google Generative AI SDK (`@google/genai`)
- dotenv (for managing environment variables)

## 📂 Folder Structure

```
.
├── uploads/           # Temporary storage for uploaded resumes
├── .env               # Environment variables
├── index.js           # Main application file
└── README.md          # This file
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pranab-acharya/pickright.git
cd pickright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
PORT=6001
GEMINI_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-pro
```

> 🔑 You can obtain a Gemini API Key from: https://makersuite.google.com/app/apikey

### 4. Start the Server

```bash
node index.js
```

Server will be running on: `http://localhost:6001`

## 📤 API Endpoint

### `POST /api/evaluate`

**Request:**

- `Content-Type: multipart/form-data`
- Fields:
  - `resume`: File (PDF or DOCX)
  - `job_description`: Text

**Response:**

```json
{
  "feedback": "Detailed AI feedback...",
  "verdict": "Selected" // or "Rejected"
}
```

## ❗ Supported File Types

- `.pdf` (application/pdf)
- `.docx` (application/vnd.openxmlformats-officedocument.wordprocessingml.document)

## 🧹 Cleanup

Uploaded files are automatically deleted after processing.

## 🛠️ Future Enhancements

- Frontend UI for uploading resumes
- Authentication and user accounts
- Resume scoring system
- Store resume analysis history

## 📝 License

ISC License

---

Built with 💻 by Pranab Acharya
