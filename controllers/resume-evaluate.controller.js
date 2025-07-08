import { promises as fs } from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { evaluateResume } from "../services/gemini.service.js";


export async function handleResumeEvaluate(req, res) {
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
}