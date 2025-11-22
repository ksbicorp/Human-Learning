# Human Learning - AI-Powered Learning Profile Analysis

![Human Learning](https://img.shields.io/badge/AI-Gemini%203.0%20Pro-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6)

## 📸 Application Preview

### Hero Section
![Human Learning Hero](https://github.com/user-attachments/assets/aa8dc50f-af15-4155-9482-d6153085007a)

### Full Application
![Human Learning Full App](https://github.com/user-attachments/assets/7e7dd37c-fd3b-4a99-8374-499c4d9a8029)

## 🧠 Overview

**Human Learning** is an advanced AI-powered application that analyzes your chat conversations to discover your unique learning patterns and communication style. Using Google's cutting-edge **Gemini 3.0 Pro** model with advanced reasoning capabilities, it generates personalized AI prompts optimized for how you learn best.

### Key Features

- 🤖 **Advanced AI Analysis** - Powered by Gemini 3.0 Pro with state-of-the-art reasoning
- 📊 **Learning Profile Discovery** - Understand your unique communication patterns
- ✨ **Personalized Prompts** - Get custom AI prompts optimized for your learning style
- 📁 **Multi-Platform Support** - Import conversations from ChatGPT, Claude, and other AI platforms
- 🎨 **Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- 🔒 **Privacy-Focused** - All analysis happens through secure API calls

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/ksbicorp/Human-Learning.git

# Navigate to the project directory
cd Human-Learning

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Gemini API key to .env
# VITE_GEMINI_API_KEY=your_api_key_here
```

### Running the Application

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:8080`

## 🔧 Gemini 3.0 Integration

This application uses **Gemini 3.0 Pro Preview** (`gemini-3-pro-preview`), Google's most intelligent model family built on state-of-the-art reasoning capabilities.

### Gemini 3.0 Features Used

- **Dynamic Thinking**: High-level reasoning for deep pattern analysis
- **Advanced Context Understanding**: 1M token input, 64k token output
- **Multimodal Capabilities**: Support for text, images, and documents
- **Optimal Temperature**: Default 1.0 for best reasoning performance

### API Configuration

The Gemini client is configured in `src/integrations/gemini/client.ts`:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generativeModel = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview",
  generationConfig: {
    temperature: 1.0, // Recommended default for Gemini 3
  }
});
```

### Code Examples

#### JavaScript/TypeScript (Current Implementation)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

async function analyzeChat(chatContent) {
  const result = await model.generateContent(chatContent);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
```

#### Python Alternative

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model="gemini-3-pro-preview",
    contents="Analyze this chat conversation and identify learning patterns...",
)

print(response.text)
```

#### REST API

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{"text": "Analyze this chat conversation..."}]
    }]
  }'
```

## 📖 Usage Guide

### 1. Export Your Chat History

Export conversations from your preferred AI platform:
- **ChatGPT**: Settings → Data Controls → Export Data
- **Claude**: Export conversation as JSON or TXT
- **Other platforms**: Save as JSON or TXT format

### 2. Upload and Analyze

1. Click on the upload area or drag and drop your file
2. Supported formats: `.json`, `.txt`
3. Click "ANALYZE CHAT DATA"
4. Wait for the AI analysis to complete

### 3. View Your Profile

Your learning profile includes:
- **Learning Style**: How you prefer to process information
- **Complexity Level**: Your comfort with complex concepts
- **Preferred Format**: How you like information structured
- **Key Traits**: Specific patterns in your communication

### 4. Use Your Personalized Prompt

Copy the generated prompt and use it as a system prompt in any AI chat application for optimized interactions.

## 🏗️ Project Structure

```
Human-Learning/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   │   └── Index.tsx     # Main application page
│   ├── integrations/     # External service integrations
│   │   └── gemini/       # Gemini API client
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static assets
├── electron/             # Electron desktop app (optional)
└── package.json          # Project dependencies
```

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1, TypeScript 5.8.3
- **UI Framework**: Tailwind CSS, shadcn/ui
- **AI Model**: Google Gemini 3.0 Pro
- **Build Tool**: Vite 5.4.19
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Desktop App**: Electron (optional)

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📦 Building for Production

```bash
# Build web application
npm run build

# Build desktop application (Electron)
npm run electron:build
```

## 🧪 Development

```bash
# Run linter
npm run lint

# Start development server
npm run dev

# Run Electron in development
npm run electron:dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Powered by [Google Gemini 3.0 Pro](https://ai.google.dev/gemini-api/docs/models/gemini)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Note**: This application requires a valid Google Gemini API key. The Gemini 3.0 Pro model is currently in preview and pricing may apply. Check the [official documentation](https://ai.google.dev/gemini-api/docs/models/gemini) for current pricing and rate limits.

## 🌟 Gemini 3.0 Pro Capabilities

### Model Specifications

| Feature | Specification |
|---------|--------------|
| Model ID | `gemini-3-pro-preview` |
| Context Window | 1M tokens (input) / 64k tokens (output) |
| Knowledge Cutoff | January 2025 |
| Pricing | $2-$4 / $12-$18 per 1M tokens (varies by usage) |

### Advanced Features

- **Dynamic Thinking**: Adjustable reasoning depth (low/high)
- **Media Resolution Control**: Optimized image and video processing
- **Structured Outputs**: JSON schema validation
- **Function Calling**: Tool integration support
- **Context Caching**: Efficient for repetitive queries
- **Batch API**: Cost-effective bulk processing

For detailed Gemini 3.0 documentation, visit: https://ai.google.dev/gemini-api/docs/models/gemini
