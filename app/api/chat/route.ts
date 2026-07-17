import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Vaibhav's AI Portfolio Assistant. Answer questions about Vaibhav Bhoyate briefly.

Vaibhav: AI & Data Science engineering student (2027) from Maharashtra, India.
Contact: vaibhavbhoyate976@gmail.com | WhatsApp +918830269849 | GitHub @vaibhavv-labs
Experience: Python/ML intern at R3 Systems.
Projects: CodeSentinel AI (CodeBERT vulnerability detection), Heart Disease Prediction, SentimentIQ, FaceID Attendance.
Skills: Python, PyTorch, Scikit-Learn, Streamlit, Next.js, Pandas.

If asked about something you don't know, suggest they contact Vaibhav directly. Keep answers under 3 sentences. DO NOT output your internal thoughts, bullet points, or reasoning. ONLY output the final response to the user.`;

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
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }
}
