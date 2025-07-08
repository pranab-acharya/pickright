import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({});

export async function evaluateResume(jobDescription, resumeText) {
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

    return response.text;
}