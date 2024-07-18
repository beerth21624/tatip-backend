const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        },
    };
}

function extractJSONFromText(text) {
    const jsonRegex = /{[\s\S]*}/;
    const match = text.match(jsonRegex);
    return match ? match[0] : null;
}

app.post('/translate-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    const useIndividualLines = req.body.useIndividualLines === 'true';

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

        const imagePart = fileToGenerativePart(req.file.path, req.file.mimetype);

        let prompt = `
    Extract all the text from this image. Then, provide the following:
    1. The full extracted text as a single string.
    `;

        if (useIndividualLines) {
            prompt += `
      2. Each line of text as a separate item in a list.

      Format the response as a JSON object with two keys:
      - "fullText": containing the complete extracted text
      - "lines": an array of objects, each with a "text" key containing a single line of text

      For example:
      {
        "fullText": "Line 1\\nLine 2\\nLine 3",
        "lines": [
          {"text": "Line 1"},
          {"text": "Line 2"},
          {"text": "Line 3"}
        ]
      }
      `;
        } else {
            prompt += `
      Format the response as a JSON object with one key:
      - "fullText": containing the complete extracted text

      For example:
      {
        "fullText": "Line 1\\nLine 2\\nLine 3"
      }
      `;
        }

        prompt += `
    Ensure that the response is a valid JSON object and nothing else.
    `;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response text
        const jsonText = extractJSONFromText(text);

        if (!jsonText) {
            throw new Error('Failed to extract valid JSON from the response');
        }

        // Parse the JSON response
        const parsedResponse = JSON.parse(jsonText);

        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);

        res.json(parsedResponse);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});