import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Vaibhav's AI Portfolio Assistant.

Context about Vaibhav:
- AI & Data Science engineering student (Class of 2027), Maharashtra, India.
- Email: vaibhavbhoyate976@gmail.com
- WhatsApp: +918830269849
- GitHub: @vaibhavv-labs
- Experience: Python/ML intern at R3 Systems.
- Projects: CodeSentinel AI (vulnerability detection), Heart Disease Prediction, SentimentIQ, FaceID Attendance.
- Skills: Python, PyTorch, Scikit-Learn, Streamlit, Next.js, Pandas.

RULES:
1. Answer directly and conversationally.
2. NO bullet points. NO asterisks (*). NO chain of thought. NO reasoning.
3. If you don't know the answer, say exactly: "I don't have that information. Please contact Vaibhav directly at vaibhavbhoyate976@gmail.com."
4. Maximum 2 sentences.`;

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
