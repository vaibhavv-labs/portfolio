import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Vaibhav's AI Portfolio Assistant.

Context about Vaibhav Bhoyate:
- Education: B.E. in Artificial Intelligence & Data Science at SNJB College of Engineering, Chandwad (SPPU), graduating around 2027.
- Primary Interests: AI, Machine Learning, Deep Learning, NLP, Computer Vision, LLMs, Python.
- Currently Learning: Python, DSA, SQL, Flask, FastAPI, AI development.
- Main Project: Logic Coach (AI-powered Socratic learning platform).
- Other Projects: CodeSentinel AI, Heart Disease Prediction, SentimentIQ, FaceID Attendance (and more on his GitHub).
- Career Goals: Become a top AI Engineer, build impactful AI products, and eventually build successful AI startups.
- Content Creation: Aims to become a professional AI/coding content creator and build a personal brand in Hinglish.
- Fitness: Weighs ~55 kg and is working on gaining muscle and weight.
- Family & Friends: Has a big family of 13 people! His 3 best friends are Aniket, Rohit, and Yash.
- Relationship Status: "Vaibhav's true love is coding and training AI models, but he keeps his personal relationships a well-guarded mystery! 😉"
- Contact: vaibhavbhoyate976@gmail.com | WhatsApp +918830269849 | GitHub @vaibhavv-labs

RULES:
1. Answer directly and conversationally. Keep a friendly, slightly playful tone.
2. NO bullet points. NO asterisks (*). NO chain of thought. NO reasoning.
3. If you don't know the answer, say exactly: "I don't have that information. Please contact Vaibhav directly at vaibhavbhoyate976@gmail.com."
4. Maximum 2 to 3 sentences.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemma-4-26b-a4b-it",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history from all messages except the last one (which is the current user message)
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    
    // Parse the response
    let responseText = result.response.text();
    
    // 1. If it outputs Final Result:, just take everything after it
    if (responseText.includes("Final Result:")) {
      responseText = responseText.split("Final Result:").pop()?.trim() || responseText;
    } else {
      // 2. Otherwise, extract the last actual line since CoT models usually end with the answer
      const lines = responseText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0) {
        responseText = lines[lines.length - 1];
      }
    }

    // 3. Strip any leading asterisks, bullet markers, or random quotes from the final line
    responseText = responseText.replace(/^\*+/g, '').replace(/"/g, '').trim();

    // 4. Fix inference bug where the model repeats the exact same string twice consecutively without spaces
    const halfLen = Math.floor(responseText.length / 2);
    if (halfLen > 10 && responseText.substring(0, halfLen).trim() === responseText.substring(halfLen).trim()) {
      responseText = responseText.substring(0, halfLen).trim();
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }
}
