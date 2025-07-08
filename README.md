# PickRight

PickRight is an AI-powered resume screening tool that helps recruiters evaluate and shortlist candidates instantly. Upload a resume, set job criteria, and get smart feedback and verdicts — all in seconds.

## Features
- Upload resumes in PDF or DOCX format
- Compare resumes against a job description
- Get AI-generated feedback and selection verdict
- RESTful API with easy integration
- Fast, automated, and secure

## Tech Stack
- Node.js
- Express.js
- Google Gemini AI API (`@google/genai`)
- Multer (file uploads)
- pdf-parse, mammoth (resume parsing)
- Mongoose (for future DB integration)
- dotenv (environment variable management)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory. You can use `.env.example` as a template:

```
PORT=6001
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL="gemini-2.0-flash"
```

### Running the Server
```bash
npm run dev
```
The server will start at `http://localhost:6001` by default.

## Usage

### API Endpoint
#### `POST /api/evaluate`
- **Description:** Upload a resume and job description to get AI-powered feedback and a selection verdict.
- **Form Data:**
  - `resume` (file, required): PDF or DOCX resume file
  - `job_description` (string, required): The job description text
- **Response:**
  - `feedback`: AI-generated feedback on the resume
  - `verdict`: `Selected` or `Rejected`

#### Example using `curl`:
```bash
curl -X POST http://localhost:6001/api/evaluate \
  -F "resume=@/path/to/resume.pdf" \
  -F "job_description=Your job description here"
```

## Project Structure
```
├── controllers/
│   └── resume-evaluate.controller.js
├── routes/
│   └── resume-upload.route.js
├── services/
│   └── gemini.service.js
├── uploads/
├── test/
├── index.js
├── package.json
├── .env.example
└── README.md
```

## Dependencies
- express
- @google/genai
- multer
- pdf-parse
- mammoth
- mongoose
- dotenv

## License
ISC

---

**Author:** Pranab Acharya
