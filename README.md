
# Tatip Backend

This is the backend service for Tatip, an intelligent Image to Text application that uses the Gemini AI API to extract text from images.

## Features

- Extract text from uploaded images using advanced AI
- Option to split extracted text into individual lines
- RESTful API endpoint for seamless image processing
- Optimized for high-performance and accuracy

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A Gemini AI API key

## Installation

1. Clone the Tatip backend repository:
   ```
   git clone https://github.com/your-username/tatip-backend.git
   cd tatip-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini AI API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Usage

To start the Tatip backend server, run:

```
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### POST /translate-image

Extracts text from an uploaded image using Tatip's AI-powered processing.

#### Request

- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `image`: The image file to process
  - `useIndividualLines`: Boolean (optional, default: true) - Whether to split the text into individual lines

#### Response

```json
{
  "fullText": "The complete extracted text from Tatip",
  "lines": [
    { "text": "Line 1 extracted by Tatip" },
    { "text": "Line 2 extracted by Tatip" },
    ...
  ]
}
```

If `useIndividualLines` is set to false, the response will only include the `fullText` field.

## Configuration

You can configure the following options in the `.env` file for Tatip backend:

- `PORT`: The port number on which the Tatip server will run (default: 3000)
- `GEMINI_API_KEY`: Your Gemini AI API key (required)

## Error Handling

Tatip's API will return appropriate error messages and status codes for various scenarios, such as:

- 400 Bad Request: When no image file is uploaded
- 500 Internal Server Error: When there's an error processing the image or communicating with the Gemini AI API

## Development

To run the Tatip server in development mode with automatic restarting on file changes, use:

```
npm run dev
```

## Contributing

Contributions to Tatip Backend are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature to Tatip'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

## License

Tatip is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback about Tatip, please contact our support team at support@tatip.com.

---

Tatip - Transforming Images to Precise Text
Developed by Beer Do-san