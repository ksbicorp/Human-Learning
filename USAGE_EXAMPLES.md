# Gemini 3.0 Pro Usage Examples

This document provides comprehensive examples of integrating and using the Gemini 3.0 Pro API in the Human Learning application.

## Table of Contents
- [Basic Usage](#basic-usage)
- [JavaScript/TypeScript Examples](#javascripttypescript-examples)
- [Python Examples](#python-examples)
- [REST API Examples](#rest-api-examples)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)

## Basic Usage

### JavaScript/TypeScript (Current Implementation)

The application uses the Google Generative AI SDK for JavaScript:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Initialize Gemini 3.0 Pro with recommended settings
const model = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview",
  generationConfig: {
    temperature: 1.0, // Recommended default for Gemini 3
  }
});

// Generate content
async function analyzeChat(chatContent: string) {
  const result = await model.generateContent(chatContent);
  const response = await result.response;
  const text = response.text();
  return text;
}
```

### With Structured Output

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function analyzeChatWithStructure(chatContent: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
  });

  const prompt = `
Analyze this chat conversation and identify learning patterns.
Return a JSON object with the following structure:
{
  "profile": {
    "learning_style": "string",
    "complexity_level": "string",
    "preferred_format": "string",
    "key_traits": ["string"]
  },
  "personalized_prompt": "string"
}

Chat content:
${chatContent}
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const response = await result.response;
  return JSON.parse(response.text());
}
```

## Python Examples

### Basic Python Implementation

```python
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

def analyze_chat(chat_content: str):
    """Analyze chat content using Gemini 3.0 Pro"""
    
    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=chat_content,
    )
    
    return response.text

# Example usage
if __name__ == "__main__":
    chat_data = """
    User: How do I learn programming?
    AI: Start with the basics...
    """
    
    result = analyze_chat(chat_data)
    print(result)
```

### Python with Structured Output

```python
from google import genai
from google.genai import types
import json

client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

def analyze_learning_profile(chat_content: str):
    """Analyze learning profile with structured output"""
    
    prompt = f"""
Analyze this chat conversation and identify learning patterns.
Return a JSON object with learning profile information.

Chat content:
{chat_content}
"""
    
    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
        }
    )
    
    return json.loads(response.text)

# Example with thinking level control
def analyze_with_thinking_level(chat_content: str, thinking_level: str = "high"):
    """Analyze with specific thinking level"""
    
    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=chat_content,
        config={
            "thinking_level": thinking_level,  # "low" or "high"
        }
    )
    
    return response.text
```

## REST API Examples

### Basic cURL Request

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Analyze this chat conversation and identify learning patterns..."
      }]
    }]
  }'
```

### With Generation Config

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Analyze learning patterns from this conversation..."
      }]
    }],
    "generationConfig": {
      "temperature": 1.0,
      "responseMimeType": "application/json"
    }
  }'
```

### With Thinking Level

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Deep analysis of learning patterns..."
      }]
    }],
    "generationConfig": {
      "thinkingLevel": "high"
    }
  }'
```

## Advanced Features

### 1. Using Media Resolution for Images

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function analyzeImageWithHighResolution(imageBase64: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
    apiVersion: "v1alpha"
  });

  const result = await model.generateContent({
    contents: [{
      parts: [
        { text: "What is in this screenshot of a chat interface?" },
        {
          inlineData: {
            mimeType: "image/png",
            data: imageBase64,
          },
          mediaResolution: {
            level: "media_resolution_high"
          }
        }
      ]
    }]
  });

  return result.response.text();
}
```

### 2. Streaming Responses

```typescript
async function streamChatAnalysis(chatContent: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview"
  });

  const result = await model.generateContentStream(chatContent);
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
  }
}
```

### 3. Function Calling

```typescript
const tools = [{
  functionDeclarations: [{
    name: "analyze_learning_style",
    description: "Analyze a user's learning style from chat patterns",
    parameters: {
      type: "object",
      properties: {
        learning_style: { type: "string" },
        complexity_level: { type: "string" },
        preferred_format: { type: "string" }
      },
      required: ["learning_style", "complexity_level"]
    }
  }]
}];

async function analyzeWithFunctions(chatContent: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
    tools
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: chatContent }] }],
  });

  const response = await result.response;
  return response;
}
```

### 4. Context Caching (for Large Files)

```typescript
// For conversations larger than 2,048 tokens
async function analyzeWithCaching(largeConversation: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
    cachedContent: {
      contents: [{ 
        role: "user", 
        parts: [{ text: largeConversation }] 
      }]
    }
  });

  const result = await model.generateContent(
    "Analyze the learning patterns in this conversation"
  );
  
  return result.response.text();
}
```

## Best Practices

### 1. Prompt Design for Gemini 3.0 Pro

```typescript
// ✅ Good: Concise and direct
const goodPrompt = `
Analyze this chat conversation for learning patterns.
Identify: learning style, complexity level, preferred format, and key traits.
Return structured JSON.
`;

// ❌ Bad: Overly verbose with complex prompt engineering
const badPrompt = `
You are an expert learning analyst. First, think step by step.
Then, carefully analyze... [many more instructions]
`;
```

### 2. Temperature Settings

```typescript
// ✅ Recommended: Use default temperature of 1.0
const model = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview",
  generationConfig: {
    temperature: 1.0  // Default, optimal for Gemini 3
  }
});

// ⚠️ Use with caution: Lower temperatures
// May cause looping or degraded performance in complex tasks
```

### 3. Error Handling

```typescript
async function robustAnalysis(chatContent: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-pro-preview"
    });
    
    const result = await model.generateContent(chatContent);
    const response = await result.response;
    
    // Check for blocking reasons
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Content blocked: ${response.promptFeedback.blockReason}`);
    }
    
    return response.text();
    
  } catch (error) {
    console.error('Analysis error:', error);
    
    // Handle rate limiting
    if (error.status === 429) {
      console.log('Rate limit exceeded, retry after delay');
      // Implement exponential backoff
    }
    
    // Handle quota errors
    if (error.status === 403) {
      console.log('Quota exceeded or API key invalid');
    }
    
    throw error;
  }
}
```

### 4. Optimizing Token Usage

```typescript
// For PDF/document analysis
async function analyzePDF(pdfData: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview"
  });

  const result = await model.generateContent({
    contents: [{
      parts: [{
        text: "Analyze learning patterns from this document"
      }, {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfData
        },
        // Use medium resolution for PDFs (optimal for most documents)
        mediaResolution: {
          level: "media_resolution_medium"
        }
      }]
    }]
  });

  return result.response.text();
}
```

## Environment Setup

### .env Configuration

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: For production monitoring
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=info
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true
  }
}
```

## Rate Limits and Pricing

### Gemini 3.0 Pro Preview Limits

- **Context Window**: 1M tokens (input), 64K tokens (output)
- **Rate Limits**: Varies by tier (check your quota)
- **Pricing**: 
  - Input: $2-$4 per 1M tokens
  - Output: $12-$18 per 1M tokens
  - (Pricing varies based on token count threshold)

### Optimization Tips

1. Use context caching for conversations > 2,048 tokens
2. Use appropriate media resolution levels
3. Implement request batching where possible
4. Monitor token usage via API responses

## Additional Resources

- [Gemini 3.0 Official Documentation](https://ai.google.dev/gemini-api/docs/models/gemini)
- [Google AI SDK for JavaScript](https://github.com/google/generative-ai-js)
- [Python SDK Documentation](https://ai.google.dev/gemini-api/docs/python-sdk)
- [API Reference](https://ai.google.dev/api)

## Support

For issues or questions:
- GitHub Issues: [ksbicorp/Human-Learning](https://github.com/ksbicorp/Human-Learning/issues)
- Gemini API Support: [Google AI Support](https://ai.google.dev/support)
