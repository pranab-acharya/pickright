import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";
import { promises as fs } from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const PORT = process.env.PORT || 6001;
const app = express();

const ai = new GoogleGenAI({});

async function evaluateResume(jobDescription, resumeText) {
    const prompt = `
Compare the resume below with the following job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Instructions:
1. Highlight matching skills.
2. Point out any gaps.
3. Provide a final verdict: Selected or Rejected.
4. Brief justification (2-3 lines).
`;

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: prompt,
    });
    console.log(response.text);

    return response.text;
}

app.use(express.json());

// multer config
const upload = multer({ dest: "uploads/" });

app.post("/api/evaluate", upload.single("resume"), async (req, res) => {
    const jobDescription = req.body?.job_description;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "Resume file is required!" });
    }


    if (!jobDescription) {
        await fs.unlink(file.path);
        return res.status(400).json({ error: "Job description is required!" });
    }

    try {
        const buffer = await fs.readFile(file.path);
        let resumeText = "";

        if (file.mimetype === "application/pdf") {
            const data = await pdfParse(buffer);
            resumeText = data.text;
        } else if (
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            resumeText = result.value;
        } else {
            await fs.unlink(file.path);
            return res.status(400).json({ error: "Unsupported file type." });
        }

        await fs.unlink(file.path); // cleanup uploaded file

        const responseText = await evaluateResume(jobDescription, resumeText);
        const verdict = responseText.includes('Selected') ? 'Selected' : 'Rejected'

        res.status(200).json({ feedback: responseText, verdict });
    } catch (err) {
        if (file && file.path) {
            await fs.unlink(file.path).catch(() => { });
        }
        res.status(500).json({
            error: "Processing failed",
            details: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
